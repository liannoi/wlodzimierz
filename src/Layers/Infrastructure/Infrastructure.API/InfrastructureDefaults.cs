using System.IO;

namespace Infrastructure.API
{
    public static class InfrastructureDefaults
    {
        #region Settings

        public static string Environment => "ASPNETCORE_ENVIRONMENT";
        public static string UseInMemoryDatabase => "UseInMemoryDatabase";

        #endregion

        #region Persistence

        public static string PrimaryDatabase => "WlodzimierzDatabase";
        public static string MemoryPrimaryDatabase => "WlodzimierzMemoryDatabase";

        #endregion

        #region Identity

        public static string IdentityDatabase => "WlodzimierzIdentityDatabase";
        public static string MemoryIdentityDatabase => "WlodzimierzMemoryIdentityDatabase";
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

        #endregion
    }
}