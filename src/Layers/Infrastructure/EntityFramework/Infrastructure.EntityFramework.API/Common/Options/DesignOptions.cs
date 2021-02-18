using System.IO;

namespace Infrastructure.EntityFramework.API.Common.Options
{
    public class DesignOptions
    {
        public static string StartDirectory
        {
            get
            {
                var separator = Path.DirectorySeparatorChar;
                var up = $"..{separator}";

                return
                    $"{Directory.GetCurrentDirectory()}{separator}{up}{up}{up}Presentation{separator}Presentation.API{separator}";
            }
        }
    }
}