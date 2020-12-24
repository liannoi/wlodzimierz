using System.IO;

namespace Infrastructure.Identity.API
{
    public static class IdentitySettings
    {
        public const string IdentityDatabase = "WlodzimierzIdentityDatabase";
        public const string JwtSection = "JsonWebToken";

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