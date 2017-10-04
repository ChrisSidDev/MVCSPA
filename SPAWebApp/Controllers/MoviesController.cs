using System.Net.Http;
using System.Web.Http;

namespace SPAWebApp.Controllers
{
    public class MoviesController : ApiController
    {
        // POST: api/Movies
        public object Post([FromBody] string q)
        {
            MoviesData model = null;
            var base_url = "http://api.tvmaze.com/singlesearch/shows" + q;
            var client = new HttpClient();
            var task =
                client.GetAsync(base_url)
                .ContinueWith((taskwithmsg) =>
                {
                    var response = taskwithmsg.Result;
                    var jsonTask = response.Content.ReadAsAsync<MoviesData>();
                    jsonTask.Wait();
                    model = jsonTask.Result;
                });
            task.Wait();
            if (model != null)
            {
                return model;
            }
            else
            {
                var responseData = new { notFound = "Movie not found" };
                return Json(responseData);
            }
        }
        
    }
}
