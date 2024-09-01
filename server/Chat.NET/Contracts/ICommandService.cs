using Common.Enums;
using Web.ViewModels.Commands;

namespace Contracts
{
    public interface ICommandService
    {
        public Task Warn(WarnCommandViewModel warn);
        public Task<BanCommandResult> Ban(BanCommandViewModel ban);

        public Task<UnbanCommandResult> Unban(UnbanCommandViewModel unban);
    }
}
