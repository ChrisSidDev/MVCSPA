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
    }
    public class MovieImage
    {
        [JsonProperty("medium")]
        public string MediumImage { get; set; }
        [JsonProperty("original")]
        public string OriginalImage { get; set; }
    }
}
