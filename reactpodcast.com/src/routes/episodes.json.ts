const PODCAST_ID = 'bdb43d4d-bd1d-4fbc-bd60-40f1e3299aa3';

export type Episode = {
	status: 'published' | 'draft';
	title: string;
};

export type EpisodeCollection = {
	episodes: { collection: Episode[] };
};

type EpisodeResponse = {
	body: EpisodeCollection;
};

export async function get(): Promise<EpisodeResponse> {
	let request = await fetch(
		`https://api.simplecast.com/podcasts/${PODCAST_ID}/episodes?limit=1000&offset=0`,
		{
			method: 'GET',
			headers: {
				authorization: `Bearer ${import.meta.env.VITE_SIMPLECAST_TOKEN}`
			}
		}
	);
	let episodes = await request.json();

	if (episodes) {
		return {
			body: {
				episodes
			}
		};
	}
}