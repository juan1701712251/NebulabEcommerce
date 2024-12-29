using Nop.Core;
using Nop.Services.Configuration;
using Nop.Services.Customers;
using Nop.Services.Events;
using Nop.Services.Localization;
using Nop.Web.Framework.Events;
using Nop.Web.Framework.Menu;
namespace Nop.Plugin.Api.Infrastructure
{
    public class EventConsumer : IConsumer<AdminMenuCreatedEvent>
    {
        private readonly ICustomerService _customerService;
        private readonly ILocalizationService _localizationService;
        private readonly ISettingService _settingService;
        private readonly IWebHelper _webHelper;
        private readonly IWorkContext _workContext;

        public EventConsumer(
            ISettingService settingService,
            IWorkContext workContext,
            ICustomerService customerService,
            ILocalizationService localizationService,
            IWebHelper webHelper)
        {
            _settingService = settingService;
            _workContext = workContext;
            _customerService = customerService;
            _localizationService = localizationService;
            _webHelper = webHelper;
        }

        public async Task HandleEventAsync(AdminMenuCreatedEvent eventMessage)
        {
            var workingLanguage = await _workContext.GetWorkingLanguageAsync();

            var pluginMenuName = await _localizationService.GetResourceAsync("Plugins.Api.Admin.Menu.Title", workingLanguage.Id, defaultValue: "API");

            var settingsMenuName = await _localizationService.GetResourceAsync("Plugins.Api.Admin.Menu.Settings.Title", workingLanguage.Id, defaultValue: "API");

            const string adminUrlPart = "Admin/";
            
            eventMessage.RootMenuItem.InsertAfter("Local plugins",
            new AdminMenuItem
            {
                Visible = true,
                SystemName = "Api-Main-Menu",
                Title = pluginMenuName,
                IconClass = "far fa-dot-circle",
                ChildNodes = new List<AdminMenuItem>
                {
                    new()
                    {
                        Visible = true,
                        SystemName = "Api-Settings-Menu",
                        Title =  settingsMenuName,
                        Url = _webHelper.GetStoreLocation() + adminUrlPart + "ApiAdmin/Settings",
                        IconClass = "far fa-circle"
                    }
                }
            });
        }
    }
}