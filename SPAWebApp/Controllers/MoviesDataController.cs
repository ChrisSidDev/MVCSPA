using Newtonsoft.Json;

namespace SPAWebApp.Controllers
{

    public class MoviesData
    {
        [JsonProperty("url")]
        public string Url { get; set; }
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("language")]
        public string Language { get; set; }
        [JsonProperty("image")]
        public MovieImage Image { get; set; }
        [JsonProperty("genres")]
        public string[] Genres { get; set; }
        [JsonProperty("_embedded")]
        public MovieEpisode Episodes { get; set; }
    }
    public class MovieImage
    {
        [JsonProperty("medium")]
        public string MediumImage { get; set; }
        [JsonProperty("original")]
        public string OriginalImage { get; set; }
    }
    public class MovieEpisode
    {
        [JsonProperty("episodes")]
        public Episode[] Episodes { get; set; }
    }
    public class Episode
    {
        [JsonProperty("number")]
        public string Number { get; set; }
        [JsonProperty("season")]
        public string Season { get; set; }
        [JsonProperty("url")]
        public string Url { get; set; }
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("image")]
        public EpisodeImage EpisodeImage { get; set; }
    }
    public class EpisodeImage
    {
        [JsonProperty("medium")]
        public string MediumImage { get; set; }
        [JsonProperty("original")]
        public string OriginalImage { get; set; }
    }
}
