/**
 * @copyright Copyright 2015 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @fileoverview Service for state and content of the Explorer page.
 * @author joemu@google.com (Joe Allan Muharsky)
 */

goog.provide('p3rf.perfkit.explorer.components.explorer.ExplorerStateService');

goog.require('p3rf.perfkit.explorer.components.error.ErrorService');
goog.require('p3rf.perfkit.explorer.components.error.ErrorTypes');
goog.require('p3rf.perfkit.explorer.components.explorer.ExplorerStateModel');



goog.scope(function() {
const explorer = p3rf.perfkit.explorer;
const ErrorService = explorer.components.error.ErrorService;
const ErrorTypes = explorer.components.error.ErrorTypes;
const ExplorerStateModel = explorer.components.explorer.ExplorerStateModel;


/**
 * Service that provides state and content for the Explorer page..
 * @constructor
 * @ngInject
 */
explorer.components.explorer.ExplorerStateService = function(
    $state, errorService) {
  /** @export {!AngularUI.State} */
  this.$state = $state;

  /** @private {!ErrorService} */
  this.errorSvc_ = errorService;

  /**
   * Provides storage for a list of dashboards and selection context.
   * @export {?DashboardModel}
   */
  this.selectedDashboard = null;

  /**
   * Provides storage for a list of containers and selection context.
   * @export {!ExplorerStateModel<ContainerWidgetModel>}
   */
  this.containers =
      /** @type {!ExplorerStateModel<ContainerWidgetModel>} */
      (new ExplorerStateModel($state, 'container'));

  /**
   * Provides storage for a list of widgets and selection context.
   * @export {!ExplorerStateModel<WidgetModel>}
   */
  this.widgets =
      /** @type {!ExplorerStateModel<WidgetModel>} */
      (new ExplorerStateModel($state, 'widget'));
};
const ExplorerStateService = explorer.components.explorer.ExplorerStateService;


ExplorerStateService.prototype.selectWidget = function(
    containerId, widgetId) {
  let params = {};
  let valid = true;

  if (containerId) {
    if (goog.isDefAndNotNull(this.containers.all[containerId])) {
      params['container'] = containerId;
    } else {
      this.errorSvc_.addError(ErrorTypes.DANGER,
        'Selection failed: container id ' + containerId + ' does not exist.');
      valid = false;
    }
  }

  if (widgetId) {
    if (goog.isDefAndNotNull(this.widgets.all[widgetId])) {
      params['widget'] = widgetId;
    } else {
      this.errorSvc_.addError(ErrorTypes.DANGER,
        'Selection failed: widget id ' + widgetId + ' does not exist.');
      valid = false;
    }
  }

  if (valid) {
    this.$state.go('explorer-dashboard-edit', params);
  }
};


});  // goog.scope
