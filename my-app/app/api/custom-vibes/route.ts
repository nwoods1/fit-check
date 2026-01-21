import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET - Fetch all custom vibes for the current user
export async function GET() {
  try {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("custom_vibes")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching custom vibes:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ vibes: data });
  } catch (error: any) {
    console.error("Error in GET /api/custom-vibes:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST - Create a new custom vibe
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, name, description, rubric } = await request.json();

    if (!id || !name || !rubric) {
      return NextResponse.json(
        { error: "id, name, and rubric are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("custom_vibes")
      .upsert({
        id,
        user_id: user.id,
        name,
        description,
        rubric,
      })
      .select()
      .single();

    if (error) {
      console.error("Error saving custom vibe:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, vibe: data });
  } catch (error: any) {
    console.error("Error in POST /api/custom-vibes:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE - Delete a custom vibe
export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    const { error } = await supabase
      .from("custom_vibes")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      console.error("Error deleting custom vibe:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error in DELETE /api/custom-vibes:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
