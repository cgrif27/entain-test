export interface NextToGo {
  next_to_go_ids: string[];
  race_summaries: Record<string, RaceSummaries>;
}

export interface RaceSummaries {
  advertised_start: {
    seconds: number;
  };
  category_id: string;
  meeting_id: string;
  meeting_name: string;
  race_name: string;
  race_number: number;
  venue_country: string;
  venue_id: string;
  venue_name: string;
  venue_state: string;
}
