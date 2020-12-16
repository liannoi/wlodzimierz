using System.IO;

namespace Infrastructure.API.Identity
{
    public static class IdentityDefaults
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