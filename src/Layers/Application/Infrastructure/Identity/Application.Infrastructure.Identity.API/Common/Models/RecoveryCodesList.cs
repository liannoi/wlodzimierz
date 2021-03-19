using System.Collections.Generic;

namespace Application.Infrastructure.Identity.API.Common.Models
{
    public class RecoveryCodesList
    {
        public IList<RecoveryCode> FirstPart { get; set; }
        public IList<RecoveryCode> SecondPart { get; set; }
    }
}