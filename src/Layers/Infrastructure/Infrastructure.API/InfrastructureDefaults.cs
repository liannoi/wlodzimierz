using System.IO;

namespace Infrastructure.API
{
    public static class InfrastructureDefaults
    {
        #region Settings

        public static string Environment => "ASPNETCORE_ENVIRONMENT";

        #endregion

        #region Persistence

        public static string PrimaryDatabase => "WlodzimierzDatabase";

        #endregion

        #region Identity

        public static string IdentityDatabase => "WlodzimierzIdentityDatabase";
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

        #region Testing

        public static string UseInMemoryDatabase => "UseInMemoryDatabase";
        public static string MemoryPrimaryDatabase => "WlodzimierzMemoryDatabase";
        public static string MemoryIdentityDatabase => "WlodzimierzMemoryIdentityDatabase";

        #endregion

        #region Caching

        public static string CachingDatabase => "WlodzimierzCachingDatabase";
        public static string CachingInstanceName => "Wlodzimierz_";

        #endregion
    }
}