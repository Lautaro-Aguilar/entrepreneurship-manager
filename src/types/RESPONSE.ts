import { PostgrestError } from "@supabase/supabase-js";

export default interface RESPONSE {
  data: any;
  errors: PostgrestError | null;
}
