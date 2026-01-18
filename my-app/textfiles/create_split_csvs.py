import csv
import re
import json
from datetime import datetime, timezone

# --- CONFIGURATION ---
URLS_FILE = "urls_to_process.txt"
ATTRS_FILE = "generatedAttributes.txt"
TOPS_FILE = "tops.csv"
BOTTOMS_FILE = "bottoms.csv"

# Define what counts as a "top" vs "bottom" based on the JSON 'type'
# (Backup logic in case URL parsing fails)
TOP_TYPES = {'shirt', 't-shirt', 'vest', 'jacket', 'sweater', 'hoodie', 'top', 'blouse', 'cardigan', 'corset', 'tank', 'dress'}
BOTTOM_TYPES = {'pants', 'jeans', 'shorts', 'skirt', 'trousers', 'jogger'}

def extract_metadata(url):
    """Extracts category and filename from the Supabase URL."""
    try:
        clean_url = url.split('?')[0]
        file_name = clean_url.split('/')[-1]
        
        # Extract category from folder name (e.g. 'tech_bro_shirts')
        match = re.search(r'/sign/([^/]+)/', clean_url)
        if match:
            folder = match.group(1)
            # Remove _shirts/_pants suffix for the clean category name
            category = re.sub(r'_(shirts|pants)$', '', folder)
            category = category.replace('_', '-') 
        else:
            category = "uncategorized"
            
        return category, file_name
    except Exception:
        return "unknown", "unknown"

def main():
    # 1. Read URLs and map ID -> URL
    url_map = {}
    print("Reading URLs...")
    try:
        with open(URLS_FILE, 'r', encoding='utf-8') as f:
            for line in f:
                if "ID:" in line and "URL:" in line:
                    parts = line.split('|')
                    row_id = parts[0].replace("ID:", "").strip()
                    url = parts[1].replace("URL:", "").strip()
                    url_map[row_id] = url
    except FileNotFoundError:
        print(f"❌ Error: {URLS_FILE} not found.")
        return

    # 2. Process Attributes and Split
    print("Processing attributes and splitting files...")
    tops_rows = []
    bottoms_rows = []
    
    headers = ["id", "category", "created_at", "image_url", "og_file_name", "attributes"]
    current_time = datetime.now(timezone.utc).isoformat()

    try:
        with open(ATTRS_FILE, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                row_id = row['id']
                attributes_json = row['attributes']
                
                # Skip if no URL found
                if row_id not in url_map:
                    continue
                    
                image_url = url_map[row_id]
                category, og_file_name = extract_metadata(image_url)
                
                # Parse attributes to check type
                try:
                    attr_dict = json.loads(attributes_json)
                    item_type = attr_dict.get('type', '').lower()
                except:
                    item_type = 'unknown'

                # Build the row object
                csv_row = {
                    "id": row_id,
                    "category": category,
                    "created_at": current_time,
                    "image_url": image_url,
                    "og_file_name": og_file_name,
                    "attributes": attributes_json
                }

                # LOGIC: Sort into Tops vs Bottoms
                # First check explicit types, default to checking the file URL path
                if item_type in BOTTOM_TYPES or 'pants' in image_url or 'jeans' in image_url:
                    bottoms_rows.append(csv_row)
                else:
                    # Default everything else (shirts, jackets, etc) to tops
                    tops_rows.append(csv_row)

    except FileNotFoundError:
        print(f"❌ Error: {ATTRS_FILE} not found.")
        return

    # 3. Write CSVs
    for filename, rows in [(TOPS_FILE, tops_rows), (BOTTOMS_FILE, bottoms_rows)]:
        if rows:
            with open(filename, 'w', encoding='utf-8', newline='') as f:
                writer = csv.DictWriter(f, fieldnames=headers)
                writer.writeheader()
                writer.writerows(rows)
            print(f"✅ Generated {filename} ({len(rows)} rows)")
        else:
            print(f"⚠️ No data found for {filename}")

if __name__ == "__main__":
    main()