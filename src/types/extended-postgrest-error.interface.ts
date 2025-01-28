import type { PostgrestError } from '@supabase/supabase-js'

export interface ExtendedPostgrestErrorInterface extends PostgrestError {
  statusCode?: number
}
