using System.IO;

namespace Infrastructure.API
{
    public static class InfrastructureDefaults
    {
        public static string Database => "WlodzimierzDatabase";
        public static string Environment => "ASPNETCORE_ENVIRONMENT";
        public static string JwtSection => "JsonWebToken";

        public static string StartDirectory
        {
            get
            {
                var separator = Path.DirectorySeparatorChar;
                var up = $"..{separator}";

                return
                    $"{Directory.GetCurrentDirectory()}{separator}{up}{up}Presentation{separator}Presentation.API{separator}";
            }
        }
    }
}