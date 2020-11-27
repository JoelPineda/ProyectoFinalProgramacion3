using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Tarea_9_10.Startup))]
namespace Tarea_9_10
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
