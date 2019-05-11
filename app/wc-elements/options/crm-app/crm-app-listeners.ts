import { browserAPI, BrowserAPI } from '../../../js/polyfills/browser.js';
import { I18NKeys } from '../../../_locales/i18n-keys.js';
import { CrmApp, JQueryContextMenu } from './crm-app';
import { CRMWindow } from '../../defs/crm-window.js';
import { EncodedString } from '../../defs/globals.js';

declare const window: CRMWindow;

export class CRMAppListeners {
	constructor(private _parent: CrmApp) { }
	public get parent() {
		return this._parent;
	}
	undo() {
		window.app.uploading.revert();
	}
	_toggleBugReportingTool() {
		window.errorReportingTool.toggleVisibility();
	}
	;
	toggleTypescript() {
		window.scriptEdit.toggleTypescript();
		window.app.$.editorTypescript.classList.toggle('active');
	}
	toggleToolsRibbon() {
		const horizontalCenterer = window.crmEditPage.$.horizontalCenterer;
		const bcr = horizontalCenterer.getBoundingClientRect();
		const viewportWidth = bcr.width + 20;
		$(window.doc.editorToolsRibbonContainer).animate({
			marginLeft: window.app.storageLocal.hideToolsRibbon ? '0' :
				'-200px'
		}, {
				duration: 250,
				easing: ($ as JQueryContextMenu).bez([0.215, 0.610, 0.355, 1.000]),
				step: (now: number) => {
					window.doc.fullscreenEditorEditor.style.width =
						`${viewportWidth - 200 - now}px`;
					window.doc.fullscreenEditorEditor.style.marginLeft =
						`${now + 200}px`;
					(window.scriptEdit || window.scriptEdit).getEditorInstance().editor.layout();
				}
			});
		window.app.storageLocal.hideToolsRibbon = !window.app.storageLocal.hideToolsRibbon;
		window.app.upload();
	}
	;
	launchSearchWebsiteToolScript() {
		if (this.parent.props.item && this.parent.props.item.type === 'script' && window.scriptEdit) {
			const paperSearchWebsiteDialog = this.parent.$.paperSearchWebsiteDialog;
			paperSearchWebsiteDialog.init();
			paperSearchWebsiteDialog.setOutputType('script');
			paperSearchWebsiteDialog.show();
		}
	}
	;
	launchSearchWebsiteToolLink() {
		const paperSearchWebsiteDialog = this.parent.$.paperSearchWebsiteDialog;
		paperSearchWebsiteDialog.init();
		paperSearchWebsiteDialog.setOutputType('link');
		paperSearchWebsiteDialog.show();
	}
	;
	launchExternalEditorDialog() {
		if (!(window.doc.externalEditorDialogTrigger as HTMLDivElement & {
			disabled: boolean;
		}).disabled) {
			window.externalEditor.init();
			window.externalEditor.editingCRMItem = window.codeEditBehavior.getActive().item as any;
			window.externalEditor.setupExternalEditing();
		}
	}
	;
	runLint() {
		window.app.util.getDialog().getEditorInstance().runLinter();
	}
	;
	showCssTips() {
		window.doc.cssEditorInfoDialog.open();
	}
	;
	async showManagePermissions() {
		if (browserAPI.permissions) {
			await this.parent.requestPermissions([], true);
		}
		else {
			window.app.util.showToast(await this.parent.__prom(I18NKeys.crmApp.code.permissionsNotSupported));
		}
	}
	;
	iconSwitch(e: MouseEvent, types: {
		x?: any;
	} | boolean[]) {
		let parentCrmTypes = this.parent.crmTypes;
		if (typeof parentCrmTypes === 'number') {
			const arr: CRM.ContentTypes = [false, false, false, false, false, false];
			arr[parentCrmTypes] = true;
			parentCrmTypes = arr;
		}
		else {
			parentCrmTypes = [...parentCrmTypes] as CRM.ContentTypes;
		}
		let selectedTypes = parentCrmTypes;
		if (Array.isArray(types)) {
			for (let i = 0; i < 6; i++) {
				let crmEl = <unknown>this.parent.shadowRoot.querySelectorAll('.crmType')[i] as HTMLElement;
				if (types[i]) {
					crmEl.classList.add('toggled');
				}
				else {
					crmEl.classList.remove('toggled');
				}
			}
			selectedTypes = [...types] as CRM.ContentTypes;
		}
		else {
			const element = this.parent.util.findElementWithClassName(e, 'crmType');
			const crmTypes = this.parent.shadowRoot.querySelectorAll('.crmType');
			for (let i = 0; i < 6; i++) {
				let crmEl = <unknown>crmTypes[i] as HTMLElement;
				if (crmEl === element) {
					//Toggle this element
					if (!selectedTypes[i]) {
						//Toggle it on
						crmEl.classList.add('toggled');
					}
					else {
						//Toggle it off
						crmEl.classList.remove('toggled');
					}
					selectedTypes[i] = !selectedTypes[i];
				}
			}
		}
		browserAPI.storage.local.set({
			selectedCrmType: selectedTypes
		});
		for (let i = 0; i < 6; i++) {
			if (this.parent.crmTypes[i] !== selectedTypes[i]) {
				this.parent.fire('crmTypeChanged');
				break;
			}
		}
		this.parent.crmTypes = selectedTypes;
	}
	;
	private async _getDownloadPermission(): Promise<boolean> {
		if (BrowserAPI.getSrc().downloads && BrowserAPI.getSrc().downloads.download) {
			return true;
		}
		if (!(BrowserAPI.getSrc().permissions)) {
			window.app.util.showToast(
				await this.parent.__prom(I18NKeys.crmApp.code.downloadNotSupported));
			return false;
		}
		return new Promise<boolean>((resolve) => {
			browserAPI.permissions.contains({
				permissions: ['downloads']
			}).then(async (granted) => {
				if (granted) {
					resolve(true);
				} else {
					browserAPI.permissions.request({
						permissions: ['downloads']
					}).then((granted) => {
						//Refresh browserAPI object
						browserAPI.downloads = browserAPI.downloads || BrowserAPI.getDownloadAPI();
						resolve(granted);
					});
				}
			});
		});
	}
	async _generateRegexFile() {
		const filePath = this.parent.$.URISchemeFilePath.$('input').value.replace(/\\/g, '\\\\');
		const schemeName = this.parent.$.URISchemeSchemeName.$('input').value;
		const regFile = [
			'Windows Registry Editor Version 5.00',
			'',
			'[HKEY_CLASSES_ROOT\\' + schemeName + ']',
			'@="URL:' + schemeName + ' Protocol"',
			'"URL Protocol"=""',
			'',
			'[HKEY_CLASSES_ROOT\\' + schemeName + '\\shell]',
			'',
			'[HKEY_CLASSES_ROOT\\' + schemeName + '\\shell\\open]',
			'',
			'[HKEY_CLASSES_ROOT\\' + schemeName + '\\shell\\open\\command]',
			'@="\\"' + filePath + '\\""'
		].join('\n');
		const allowed = await this._getDownloadPermission();
		if (allowed) {
			if (browserAPI.downloads) {
				browserAPI.downloads.download({
					url: 'data:text/plain;charset=utf-8;base64,' + window.btoa(regFile),
					filename: schemeName + '.reg'
				});
			}
			else {
				window.app.util.showToast(await this.parent.__prom(I18NKeys.crmApp.code.downloadNotSupported));
			}
		}
	}
	;
	globalExcludeChange(e: MouseEvent) {
		const input = this.parent.util.findElementWithTagname(e, 'paper-input');
		let excludeIndex = null;
		const allExcludes = document.getElementsByClassName('globalExcludeContainer');
		for (let i = 0; i < allExcludes.length; i++) {
			if (allExcludes[i] === input.parentNode) {
				excludeIndex = i;
				break;
			}
		}
		if (excludeIndex === null) {
			return;
		}
		const value = input.$('input').value;
		const updated = [...this.parent.globalExcludes.getValue()];
		updated[excludeIndex] = value;
		this.parent.globalExcludes.setValue(updated);
		browserAPI.storage.local.set({
			globalExcludes: updated
		} as any);
	}
	;
	removeGlobalExclude(e: any) {
		console.log(e);
		//TODO:
		const node = this.parent.util.findElementWithTagname(e, 'paper-icon-button');
		let excludeIndex = null;
		const allExcludes = document.getElementsByClassName('globalExcludeContainer');
		for (let i = 0; i < allExcludes.length; i++) {
			if (allExcludes[i] === node.parentNode) {
				excludeIndex = i;
				break;
			}
		}
		if (excludeIndex === null) {
			return;
		}
		const excludes = [...this.parent.globalExcludes.getValue()];
		excludes.splice(excludeIndex, 1);
		this.parent.globalExcludes.setValue(excludes);
	}
	;
	async importData() {
		const dataString = this.parent.$.importSettingsInput.value as EncodedString<{
			local?: CRM.StorageLocal;
			storageLocal?: CRM.StorageLocal;
			settings: CRM.SettingsStorage;
		}>;
		let data: {
			crm?: CRM.Tree;
			local?: CRM.StorageLocal;
			nonLocal?: CRM.SettingsStorage;
			storageLocal?: CRM.StorageLocal;
		};
		try {
			data = JSON.parse(dataString);
			this.parent.$.importSettingsError.style.display = 'none';
		}
		catch (e) {
			this.parent.$.importSettingsError.style.display = 'block';
			return;
		}
		window.app.uploading.createRevertPoint();
		const overWriteImport = this.parent.$.overWriteImport;
		if (overWriteImport.checked && (data.local || data.storageLocal)) {
			this.parent.settings = data.nonLocal || this.parent.settings;
			this.parent.storageLocal = data.local || this.parent.storageLocal;
		}
		if (data.crm) {
			if (overWriteImport.checked) {
				this.parent.settings.crm = this.parent.util.crmForEach(data.crm, (node) => {
					node.id = this.parent.generateItemId();
				});
			}
			else {
				this.parent.addImportedNodes(data.crm);
			}
			this.parent.editCRM.build();
		}
		//Apply settings
		this.parent.setup.initCheckboxes(this.parent.storageLocal);
		this.parent.upload();

		this.parent.util.showToast(await this.parent.__prom(I18NKeys.crmApp.code.importSuccess));
	}
	;
	exportData() {
		const toExport: {
			crm?: CRM.SafeTree;
			local?: CRM.StorageLocal;
			nonLocal?: CRM.SettingsStorage;
		} = {} as any;
		if (this.parent.$.exportCRM.checked) {
			toExport.crm = JSON.parse(JSON.stringify(this.parent.settings.crm));
			for (let i = 0; i < toExport.crm.length; i++) {
				toExport.crm[i] = this.parent.editCRM.makeNodeSafe(toExport.crm[i] as CRM.Node);
			}
		}
		if (this.parent.$.exportSettings.checked) {
			toExport.local = this.parent.storageLocal;
			toExport.nonLocal = JSON.parse(JSON.stringify(this.parent.settings));
			delete toExport.nonLocal.crm;
		}
		window.doc.exportSettingsSpinner.hide = false;
		window.setTimeout(() => {
			this.parent.$.exportSettingsOutput.value = JSON.stringify(toExport);
			window.requestAnimationFrame(() => {
				window.doc.exportSettingsSpinner.hide = true;
			});
		}, 100);
	}
	;
	addGlobalExcludeField() {
		const excludes = [...this.parent.globalExcludes.getValue()];
		excludes.push('');
		this.parent.globalExcludes.setValue(excludes);
	}
	;
	_openLogging() {
		window.open(browserAPI.runtime.getURL('entrypoints/logging.html'), '_blank');
	}
	;
	hideGenericToast() {
		this.parent.$.messageToast.hide();
	}
	;
	nextUpdatedScript() {
		let index = this.parent.$.scriptUpdatesToast.index;
		this.parent.$.scriptUpdatesToast.text = this.parent.setup.getUpdatedScriptString(this.parent.$.scriptUpdatesToast.scripts[++index]);
		this.parent.$.scriptUpdatesToast.index = index;
		if (this.parent.$.scriptUpdatesToast.scripts.length - index > 1) {
			this.parent.$.nextScriptUpdateButton.style.display = 'inline';
		}
		else {
			this.parent.$.nextScriptUpdateButton.style.display = 'none';
		}
	}
	;
	hideScriptUpdatesToast() {
		this.parent.$.scriptUpdatesToast.hide();
	}
	;
	private _copyFromElement(target: HTMLTextAreaElement, button: HTMLPaperIconButtonElement) {
		const snipRange = document.createRange();
		snipRange.selectNode(target);
		const selection = window.getSelection();
		selection.removeAllRanges();
		selection.addRange(snipRange);
		try {
			document.execCommand('copy');
			button.icon = 'done';
		}
		catch (err) {
			// Copy command is not available
			console.error(err);
			button.icon = 'error';
		}
		// Return to the copy button after a second.
		window.setTimeout(() => {
			button.icon = 'content-copy';
		}, 1000);
		selection.removeAllRanges();
	}
	copyExportDialogToClipboard() {
		this._copyFromElement(this.parent.$.exportJSONData, this.parent.$.dialogCopyButton);
	}
	;
	copyExportToClipboard() {
		this._copyFromElement(this.parent.$.exportSettingsOutput, this.parent.$.exportCopyButton);
	}
	private _applyAddedPermissions() {
		const panels = Array.prototype.slice.apply(window.doc.addedPermissionsTabContainer
			.querySelectorAll('.nodeAddedPermissionsCont'));
		panels.forEach((panel: HTMLElement) => {
			const node = this.parent.nodesById
				.get(~~(panel.getAttribute('data-id') as any) as CRM.GenericNodeId) as CRM.ScriptNode;
			const permissions = Array.prototype.slice.apply(panel.querySelectorAll('paper-checkbox'))
				.map(function (checkbox: HTMLPaperCheckboxElement) {
					if (checkbox.checked) {
						return checkbox.getAttribute('data-permission');
					}
					return null;
				}).filter(function (permission: string) {
					return !!permission;
				});
			if (!Array.isArray(node.permissions)) {
				node.permissions = [];
			}
			permissions.forEach(function (addedPermission: CRM.Permission) {
				if (node.permissions.indexOf(addedPermission) === -1) {
					node.permissions.push(addedPermission);
				}
			});
		});
		this.parent.upload();
	}
	;
	addedPermissionNext() {
		const cont = window.doc.addedPermissionsTabContainer as AddedPermissionsTabContainer;
		if (cont.tab === cont.maxTabs - 1) {
			window.doc.addedPermissionsDialog.close();
			this._applyAddedPermissions();
			return;
		}
		if (cont.tab + 2 !== cont.maxTabs) {
			(window.doc.addedPermissionNextButton.querySelector('.close') as HTMLElement).style.display = 'none';
			(window.doc.addedPermissionNextButton.querySelector('.next') as HTMLElement).style.display = 'block';
		}
		else {
			(window.doc.addedPermissionNextButton.querySelector('.close') as HTMLElement).style.display = 'block';
			(window.doc.addedPermissionNextButton.querySelector('.next') as HTMLElement).style.display = 'none';
		}
		cont.style.marginLeft = (++cont.tab * -800) + 'px';
		window.doc.addedPermissionPrevButton.style.display = 'block';
	}
	;
	addedPermissionPrev() {
		const cont = window.doc.addedPermissionsTabContainer as AddedPermissionsTabContainer;
		cont.style.marginLeft = (--cont.tab * -800) + 'px';
		window.doc.addedPermissionPrevButton.style.display = (cont.tab === 0 ? 'none' : 'block');
	}
	;
	private _getCodeSettingsFromDialog(): CRM.Options {
		const obj: CRM.Options = {};
		Array.prototype.slice.apply(this.parent.shadowRoot.querySelectorAll('.codeSettingSetting'))
			.forEach((element: HTMLElement) => {
				let value: CRM.OptionsValue;
				const key = element.getAttribute('data-key');
				const type = element.getAttribute('data-type') as CRM.OptionsValue['type'];
				const currentVal = (this.parent.$.codeSettingsDialog.item.value.options as CRM.Options)[key];
				switch (type) {
					case 'number':
						value = this.parent.templates.mergeObjects(currentVal, {
							value: ~~element.querySelector('paper-input').value
						});
						break;
					case 'string':
						value = this.parent.templates.mergeObjects(currentVal, {
							value: element.querySelector('paper-input').value
						});
						break;
					case 'color':
						value = this.parent.templates.mergeObjects(currentVal, {
							value: element.querySelector('input').value
						});
						break;
					case 'boolean':
						value = this.parent.templates.mergeObjects(currentVal, {
							value: element.querySelector('paper-checkbox').checked
						});
						break;
					case 'choice':
						value = this.parent.templates.mergeObjects(currentVal, {
							selected: element.querySelector('paper-dropdown-menu').selected
						});
						break;
					case 'array':
						const arrayInput = element.querySelector('paper-array-input');
						arrayInput.saveSettings();
						let values = arrayInput.values as (string[]|number[]);
						if ((currentVal as CRM.OptionArray).items === 'string') {
							//Strings
							values = (values as string[]).map(value => value + '');
						}
						else {
							//Numbers
							values = (values as number[]).map(value => ~~value);
						}
						value = this.parent.templates.mergeObjects(currentVal, {
							value: values as string[]
						});
						break;
				}
				obj[key] = value;
			});
		return obj;
	}
	confirmCodeSettings() {
		this.parent.$.codeSettingsDialog.item.value.options = this._getCodeSettingsFromDialog();
		this.parent.upload();
	}
	exitFullscreen() {
		window.app.util.getDialog().exitFullScreen();
	}
	toggleFullscreenOptions() {
		const dialog = window.app.util.getDialog();
		dialog.toggleOptions();
	}
	setThemeWhite() {
		window.app.util.getDialog().setThemeWhite();
	}
	setThemeDark() {
		window.app.util.getDialog().setThemeDark();
	}
	fontSizeChange() {
		window.setTimeout(() => {
			window.app.util.getDialog().fontSizeChange();
		}, 0);
	}
	jsLintGlobalsChange() {
		window.setTimeout(() => {
			window.scriptEdit.jsLintGlobalsChange();
		}, 0);
	}
	onKeyBindingKeyDown(e: KeyboardEvent) {
		if (this.parent.props.item.type === 'script') {
			window.scriptEdit.onKeyBindingKeyDown(e);
		}
	}
}