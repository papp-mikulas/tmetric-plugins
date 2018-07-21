class ActiveCollab implements WebToolIntegration {
  /**
   * The array of URLs (with wildcards) that are used to identify
   * pages as those that belong to the service.
   */
  matchUrl = '*://*/projects/*';

  showIssueId = true;

  observeMutations = true;

  issueElementSelector = [
    '.object_view_main',          // task
  ]

  render(issueElement: HTMLElement, linkElement: HTMLElement) {

    let existing = $$('div.object_view_sidebar .tmetric');

    let host = $$('div.object_view_sidebar');
    if (host) {
      if (existing) {
        host.removeChild(existing);
      }

      let newdiv = document.createElement("div");
      newdiv.classList.add('page_section');
      newdiv.classList.add('with_padding');
      newdiv.classList.add('tmetric');
      newdiv.appendChild(linkElement);
      host.appendChild(newdiv);
    }
  }

  getIssue(issueElement: HTMLElement, source: Source): WebToolIssue {

    let issueName = (<any>$$.try('#project_task .task_name')).textContent;
    if (!issueName) {
      return;
    }

    let projectName = (<any>$$.try('#project_task a[data-qa-id="task-project-label-name"]')).textContent;
    let issueId = (<any>$$.try('#project_task span[ng-bind="task.task_number"]')).textContent;
    if (issueId && projectName) {
      let issueUrl = source.path;
      let serviceUrl = source.protocol + source.host;
      let serviceType = 'ActiveCollab';

      return { issueId, issueName, projectName, serviceType, serviceUrl, issueUrl };
    }
  }
}

IntegrationService.register(new ActiveCollab());
