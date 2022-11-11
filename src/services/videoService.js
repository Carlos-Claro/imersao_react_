import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://nqcmjfnyjvekzbkrkmav.supabase.co";
const PROJECT_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xY21qZm55anZla3pia3JrbWF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxODk5NjIsImV4cCI6MTk4Mzc2NTk2Mn0.wl3K3UU1N9cd3Ir6aBDCy6bz-62oLldfWI3p4EX4H7o";
const supabase = createClient(PROJECT_URL, PROJECT_KEY);

export function videoService(){
    return {
        getAllVideos() {
            return supabase.from("video").select("*")
                ;
        },
        insertVideo(){

        }
    }
}