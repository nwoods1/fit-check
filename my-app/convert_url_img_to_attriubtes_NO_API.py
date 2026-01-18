import os
from supabase import create_client
from dotenv import load_dotenv

# Load the environment variables
load_dotenv('.env.local')

# Setup Supabase
url = os.getenv('NEXT_PUBLIC_SUPABASE_URL')
key = os.getenv('SUPABASE_SERVICE_ROLE_KEY') or os.getenv('NEXT_PUBLIC_SUPABASE_ANON_KEY')

if not url or not key:
    print("❌ Error: Could not find URL or Key in .env.local")
    exit()

supabase = create_client(url, key)

def get_urls_to_process(table_name, file_handle):
    # Fetch rows where attributes are empty
    result = supabase.table(table_name).select("id, image_url").is_("attributes", "null").execute()
    
    if result.data:
        file_handle.write(f"--- {table_name.upper()} ---\n")
        for row in result.data:
            line = f"ID: {row['id']} | URL: {row['image_url']}\n"
            file_handle.write(line)
        file_handle.write("\n")
        print(f"✅ Added {len(result.data)} {table_name} to the file.")
    else:
        print(f"ℹ️ No empty attributes found in '{table_name}'.")

# Open the file in 'w' (write) mode
with open("urls_to_process.txt", "w") as f:
    get_urls_to_process("shirts", f)
    get_urls_to_process("pants", f)

print("\nDone! You can now open 'urls_to_process.txt' and copy the contents here.")