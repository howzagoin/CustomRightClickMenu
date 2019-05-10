import { TemplateFn, CHANGE_TYPE } from '../../../modules/wclib/build/es/wclib.js';
import { render } from '../../../modules/lit-html/lit-html.js';
import { calc } from '../../lib/polyfills/calc.js';
import { CrmApp } from './crm-app.js';

export const CrmAppCSS = new TemplateFn<CrmApp>(function (html) {
	return html`<style>
		.title {
			display: flex;
			flex: 1 1 auto;
			align-items: center;
			justify-content: center;
		}

		.bigTxt {
			font-size: 300%;
			font-family: 'RobotoSlab';
		}

		.container {
			font-size:150%;
			width: 1000px;
			padding-left: ${calc('(100vw - 1020px) / 2')};
			padding-right: ${calc('((100vw - 1020px) / 2)')};
			margin-top: 64px;
		}

		.contextMenu {
			position: absolute;
		}

		#buttonsContainer {
			font-size: 12.1875px;
		}

		.CRMEditDivider, .CRMEditLink, .CRMEditMenu, .CRMEditScript {
			width: 200px;
			height: 50px;
			margin-bottom: 1px;
			cursor: pointer;
			font-size: 150%;
			text-align: center;
			line-height: 50px;
			-webkit-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
				user-select: none;
		}

		.CRMEditCont:first-child {
			margin-left: 3px;
		}

			.CRMEditDivider:hover, .CRMEditLink:hover, .CRMEditMenu:hover, .CRMEditScript:hover {
				background-color:rgb(245, 245, 245);
			}

		paper-shadow {
			pointer-events: none;
		}

		.editContent {
			display: inline-block;
		}

		.paper-icon-button-0 {
			width: 35px;
			height: 35px;
		}

		.iron-icon-0 {
			margin: 0;
		}

		.title {
			text-align: center;
			font-size: 200%!important;
			height: 40px;
			font-family: 'RobotoSlab';
		}

		paper-checkbox #ink[checked] {
			color: rgb(63, 81, 181);
		}

		paper-checkbox.paper-checkbox-0 #checkbox.checked.paper-checkbox {
			background-color: rgb(63, 81, 181);
			border-color: rgb(63, 81, 181);
		}

		paper-ripple {
			pointer-events: none;
		}

		.popupCont {
			position: absolute;
			z-index:10;
		}

		.backdropCont {
			position: fixed;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100vh;
			display: none;
			background-color: black;
			opacity: 0;
			z-index: 5;
			pointer-events: all;
			transition: opacity 300ms cubic-bezier(0.215, 0.610, 0.355, 1.000);
		}

		.backdropCont.animateIn {
			opacity: 0.3
		}

		.backdropCont.visible {
			display: block;
		}

		.backdropCont.clickthrough {
			pointer-events: none;
		}

		#menuSwitchUndoButton, #externalEditorTryAgainButton, #externalEditoOpenLocationInBrowser, .toastLink {
			color: rgb(238, 255, 65);
			margin: 10px;
			cursor: pointer;
		}

		#fullscreenEditor {
			position: fixed;
			z-index:100;
			-moz-flex-direction: column;
			-webkit-box-orient: vertical;
			-webkit-box-direction: normal;
			-webkit-flex-direction: column;
					flex-direction: column;
			width: 100vw;
			display: none;
		}

		#editorCurrentScriptTitle {
			background-color: white;
			font-size: 300%;
			font-weight: 500;
			text-align: center;
			padding: 4px 0;
			margin-top: -51px;
			margin-left:-200px;
			display: none;
			-moz-flex-direction: row;
			-webkit-box-orient: horizontal;
			-webkit-box-direction: normal;
			-webkit-flex-direction: row;
					flex-direction: row;
			-webkit-box-pack: justify;
			-webkit-justify-content: space-between;
					justify-content: space-between;
			-webkit-user-select:none;
			-moz-user-select: none;
			-ms-user-select: none;
				user-select: none;
		}

		.editorCurrentScriptTitle span {
			-webkit-user-select: initial;
			-moz-user-select: initial;
			-ms-user-select: initial;
				user-select: initial;
		}

		#fullscreenEditorHorizontal {
			display: -webkit-box;
			display: -webkit-flex;
			display: flex;
			-webkit-box-orient: horizontal;
			-webkit-box-direction: normal;
			-webkit-flex-direction: row;
					flex-direction: row;
			-webkit-box-flex: 100;
			-webkit-flex-grow: 100;
					flex-grow: 100;
		}

		#editorToolsRibbonContainer {
			margin-left: -200px;
			width: 200px;
			background-color: white;
			-webkit-box-pack: justify;
			-webkit-justify-content: space-between;
					justify-content: space-between;
			display: -webkit-box;
			display: -webkit-flex;
			display: flex;
			-webkit-box-orient: vertical;
			-webkit-box-direction: normal;
			-webkit-flex-direction: column;
					flex-direction: column;
			position: absolute;
			height: 100%;
		}

		app-header {
			background-color: rgb(255, 87, 34)!important;
			color: white;
		}

		#addLibraryManualInput {
			display:none;
			max-width: 300px;
			max-height: 250px;
		}

		#addLibraryConfirmationInput {
			height: 250px;
			max-width: 300px;
		}

		paper-dialog {
			z-index: 10000!important;
		}

		iron-overlay-backdrop {
			z-index: 9995 !important;
		}

		#addLibraryManualInput textarea {
			max-height: 216px;
			overflow: auto;
			max-width: 300px;
		}

		#addLibraryManualInput paper-input-container {
			max-height: 216px;
			max-width: 300px;
		}

		#addLibraryConfirmationInput textarea {
			max-height: 300px;
			overflow: auto;
			max-width: 300px;
		}

		#addLibraryConfirmationInput paper-input-container {
			max-height: 300px;
			max-width: 300px;
		}

		#addLibraryConfirmationContainer {
			display: none;
		}

		#addLibraryLoadingDialog {
			display: none;
			height: 300px;
			width: 300px;
			-webkit-box-orient: vertical;
			-webkit-box-direction: normal;
			-webkit-flex-direction: column;
					flex-direction: column;
			-webkit-box-pack: center;
			-webkit-justify-content: center;
					justify-content: center;
		}

		#addLibraryLoadingDialogCenterer {
			display: -webkit-box;
			display: -webkit-flex;
			display: flex;
			-webkit-box-orient: horizontal;
			-webkit-box-direction: normal;
			-webkit-flex-direction: row;
					flex-direction: row;
			-webkit-box-pack: center;
			-webkit-justify-content: center;
					justify-content: center;
		}

		#addLibraryDialogSucces {
			width:300px;
			height: 344px;
			margin:0;
			display: none;
			background-color:white;
		}

		#addLibraryDialog .checkmark {
			-webkit-transform: rotate(45deg);
			transform: rotate(45deg);
			position: absolute;
			top: -1px;
			left: 4px;
			width: 5px;
			height: 10px;
			border: none rgb(0, 200, 10);
			border-right: 20px solid;
			border-bottom: 20px solid;
			margin-left: 42px;
			margin-top: 16px;
			color: white;
		}

			#addLibraryDialog .checkmark.animateIn {
				-webkit-animation: expand-checkmark 140ms ease-out forwards;
				animation: expand-checkmark 140ms ease-out forwards;
			}

		@-webkit-keyframes expand-checkmark {
			0% {
				top: 180px;
				left: 120px;
				width: 0;
				height: 0;
			}
			100% {
				top: -20px;
				left: 80px;
				width: 100px;
				height: 200px;
			}
		}

		@keyframes expand-checkmark {
			0% {
				top: 180px;
				left: 120px;
				width: 0;
				height: 0;
			}
			100% {
				top: -20px;
				left: 80px;
				width: 100px;
				height: 200px;
			}
		}

		#addLibraryDialogSuccesText {
			text-align: center;
			width: 300px;
			position: absolute;
			margin-top: 267px;
			color:white;
			font-size:250%;
		}

		.ribbonTool > paper-menu, div.ribbonTool {
			border-top: 1px solid rgb(239, 239, 239);
		}

		#paperSearchWebsitesToolTrigger, #externalEditorDialogTrigger, 
		#runJsLintButton, #runCssLintButton, #showCssTipsButton {
			color: rgb(38, 153, 244);
			height: 75px;
			font-size: 196%;
			vertical-align: middle;
			display: -webkit-box;
			display: -webkit-flex;
			display: flex;
			-webkit-box-orient: vertical;
			-webkit-box-direction: normal;
			-webkit-flex-direction: column;
					flex-direction: column;
			-webkit-box-pack: center;
			-webkit-justify-content: center;
					justify-content: center;
			padding-left: 16px;
			font-weight: 500;
			cursor: pointer;
		}

		#externalEditorDialogTrigger {
			font-size: 167%;
		}

			#paperSearchWebsitesToolTrigger:hover, #externalEditorDialogTrigger:hover, #runJsLintButton:hover, #runCssLintButton:hover, #showCssTipsButton:hover {
				text-decoration: underline;
			}

			#externalEditorDialogTrigger[disabled]:hover {
				text-decoration: none;
			}

		a {
			position: relative;
			text-decoration: none;
			color: rgb(44, 161, 220);
		}

		a:focus {
			outline: none;
		}

		a:focus::before {
			background-color: rgba(0,0,0,.1);
			border-radius: 2px;
			bottom: -4px;
			content: ' ';
			left: -4px;
			margin: auto;
			padding: 4px;
			position: absolute;
			right: -4px;
			top: -4px;
		}

		#dummy {
			display: none;
		}

		#chooseFileComparison {
			display: none;
		}

		#chooseFileMerger {
			display: none;
			height: 100%;
			-webkit-box-orient: vertical;
			-webkit-box-direction: normal;
			-webkit-flex-direction: column;
					flex-direction: column;
			-webkit-box-pack: center;
			-webkit-justify-content: center;
					justify-content: center;
			padding-top: 5px;
		}

		#chooseFileMergerPlaceholder, #chooseFileMergerEditor {
			display: -webkit-box;
			display: -webkit-flex;
			display: flex;
			-webkit-box-orient: vertical;
			-webkit-box-direction: normal;
			-webkit-flex-direction: column;
					flex-direction: column;
			-webkit-box-flex: 100;
			-webkit-flex-grow: 100;
					flex-grow: 100;
		}

			#chooseFileMergerPlaceholder center-element {
				-webkit-box-flex: 100;
				-webkit-flex-grow: 100;
						flex-grow: 100;
			}

			#chooseFileMergerPlaceholder paper-spinner {
				width: 70px;
				height: 70px;
			}

		#chooseFileMergerEditor, .CodeMirror-merge-3pane .CodeMirror-merge-pane, .CodeMirror-merge-3pane .CodeMirror-merge-gap {
			height: ${calc('(100vh - 148px)')}
		}

		.updateMerge #chooseFileMergerEditor, .updateMerge .CodeMirror-merge-3pane .CodeMirror-merge-pane, .updateMerge .CodeMirror-merge-3pane .CodeMirror-merge-gap {
			height: ${calc('(100vh - 164px)')}
		}

		.updateMerge #chooseFileTitleTxt {
			margin-bottom: 0;
		}

		.CodeMirror-merge, .CodeMirror-merge .CodeMirror {
			height: 100%;
		}

		#externalEditorchooseFile {
			padding-bottom: 60px;
		}

		#externalEditorchooseFile .buttons {
			position: absolute;
			bottom: 0;
			right: 0;
		}

		#chooseFilemergerContainer {
			-webkit-box-flex: 100;
			-webkit-flex-grow: 100;
					flex-grow: 100;
			display: -webkit-box;
			display: -webkit-flex;
			display: flex;
			-webkit-box-orient: vertical;
			-webkit-box-direction: normal;
			-webkit-flex-direction: column;
					flex-direction: column;
			display: none;
		}

		#chooseFileMergerText {
			display: -webkit-box;
			display: -webkit-flex;
			display: flex;
			-webkit-box-pack: justify;
			-webkit-justify-content: space-between;
					justify-content: space-between;
			margin: 0 -33px 10px -33px;
		}

		#chooseFileCurrentTxt, #chooseFileResultTxt, #chooseFileNewTxt {
			font-size: 150%;
			font-weight: bold;
			text-align: center;
		}

		#chooseFileLeftTxtCont,  #chooseFileResultTxt, #chooseFileRightTxtCont{
			width: 31%;
		}

		#chooseFileMergerPlaceholder {
			z-index: 50;
			background-color:white;
		}

		#externalEditingTools {
			position: absolute;
			bottom: -152px;
			right: -350px;
			width: 350px;
			height: 152px;
			background-color: rgb(150,150,150);
			color: white;
		}

		#externalEditingToolsButtonsCont {
			fill: white;
		}

		#externalEditingToolsButtonsCont > div {
			display: inline-block;
			margin: 0 6px;
			font-size: 120%;
			cursor: pointer;
		}

		#externalEditingToolsButtonsCont > div:hover {
			text-decoration: underline;
		}

		#externalEditingToolsButtonsCont paper-material {
			display: inline-block;
		}

		#externalEditingToolsTitle {
			font-size: 200%;
			text-align: center;
			font-family: Roboto;
		}

		#externalEditingToolsShowLocation {
			margin: 0;
		}

			#externalEditingToolsShowLocation paper-material {
				margin-left: 6px;
			}

		.externalEditingToolText {
			text-align: center;
			font-size: 120%;
		}

		paper-toast {
			z-index: 12000;
		}

		#restoreChangesOldCode, #restoreChangesUnsavedCode {
			display: none;
			width: 800px;
			height: 600px;
			-webkit-box-orient: vertical;
			-webkit-box-direction: normal;
			-webkit-flex-direction: column;
					flex-direction: column;
		}

		.restoreChangesOption {
			color: rgb(0,119,255);
			font-weight: bold;
			cursor: pointer;
		}

			.restoreChangesOption:hover {
				text-decoration: underline;
			}

		#restoreChangesOldCodeCont, #restoreChangeUnsaveddCodeCont {
			display: -webkit-box;
			display: -webkit-flex;
			display: flex;
			-webkit-box-orient: vertical;
			-webkit-box-direction: normal;
			-webkit-flex-direction: column;
					flex-direction: column;
			-webkit-box-flex: 100;
			-webkit-flex-grow: 100;
					flex-grow: 100;
		}

			#restoreChangesOldCodeCont .CodeMirror, #restoreChangeUnsaveddCodeCont .CodeMirror {
				-webkit-box-flex: 100;
				-webkit-flex-grow: 100;
						flex-grow: 100;
			}

		#editorToolsRibbonContainer.editingStylesheet .jsTool {
			display: none!important;
		}

		#editorToolsRibbonContainer.editingScript .cssTool {
			display: none!important;
		}

		#showCssTipsButton {
			display: -webkit-box;
			display: -webkit-flex;
			display: flex;
			-webkit-box-orient: horizontal;
			-webkit-box-direction: normal;
			-webkit-flex-direction: row;
					flex-direction: row;
			-webkit-box-pack: start;
			-webkit-justify-content: flex-start;
					justify-content: flex-start;
			font-size: 200%;
			text-align: center;
			vertical-align: middle;
			fill: rgb(38, 153, 244);
			height: auto;
			padding-top: 23px;
			padding-bottom: 23px;
		}

			#showCssTipsButton svg {
				margin-top: 3px;
				width: 25px;
				height: 25px;
				margin-left: 7px;
			}

		.CodeMirror-sizer {
			-webkit-box-flex: 100;
			-webkit-flex-grow: 100;
					flex-grow: 100;
		}

		#cssEditorInfoDialog {
			width: 700px;
			padding-left:20px;
			padding-right: 20px;
		}

			#cssEditorInfoDialog h2 {
				padding-left: 0;
			}

		.inlineCodePre {
			margin: 0;
			padding: 0;
			display: inline-block;
			background-color: rgb(210, 210, 210);
		}

		#requestPermissionsDialog,
		#scriptPermissionDialog,
		#exportDialog,
		#addedPermissionsDialog {
			width: 800px;
			position: static!important;
			top: inherit!important;
			max-height: none!important;
		}

		.requestPermissionName {
			font-size: 170%;
			font-weight: 500;
			text-transform: capitalize;
			padding-top:7px;
		}

		.requestPermissionName, .requestPermissionButton, .requestPermissionsShowBot {
			display: inline-block;
		}

		.requestPermissionButton, .requestPermissionsShowBot {
			float: right;
			margin-top: 5px;
			width: 36px;
			height: 14px;
		}

		.requestPermissionsShowBot {
			margin-top: -6px;
			margin-left: 20px;
			cursor:pointer;
		}

		.requestPermissionsSvg {
			-webkit-transform: rotate(90deg);
			transform: rotate(90deg);
		}

		.requestPermissionsPermissionBotCont {
			height: 0;
			overflow: hidden;
		}

		.requestPermissionsPermissions {
			max-height: ${calc('(100vh - 400px)')};
			overflow-y: auto;
			box-shadow: inset 0 0 28px rgba(0, 0, 0, 0.4);
			margin: 0 24px;
			padding: 10px 5px;
		}

		#scriptPermissionDialog .requestPermissionsPermission {
			margin: 0;
		}

		.requestPermissionsDescription {
			padding-bottom: 10px;
		}

		#requestPermissionsLineCont {
			display: -webkit-box;
			display: -webkit-flex;
			display: flex;
			-webkit-box-orient: horizontal;
			-webkit-box-direction: normal;
			-webkit-flex-direction: row;
					flex-direction: row;
			-webkit-box-pack: end;
			-webkit-justify-content: flex-end;
					justify-content: flex-end;
			margin-bottom:20px;
		}

		#requestPermissionsSplitter {
			-webkit-box-flex:100;
			-webkit-flex-grow:100;
					flex-grow:100;
			border-bottom: 1px solid black;
			display:inline-block;
		}

		#requestPermissionsShowOther {
			display: inline-block;
			margin-bottom: -12px;
			cursor: pointer;
		}

		#requestPermissionsOther {
			height: 0;
			overflow: hidden;
		}

		#shrinkTitleRibbonButtonCont, #showHideToolsRibbonCont {
			display: -webkit-box;
			display: -webkit-flex;
			display: flex;
			-webkit-box-orient: vertical;
			-webkit-box-direction: normal;
			-webkit-flex-direction: column;
					flex-direction: column;
			-webkit-box-pack: end;
			-webkit-justify-content: flex-end;
					justify-content: flex-end;
		}

		#showHideToolsRibbonCont {
			-webkit-transform: translateX(200px);
			transform: translateX(200px);
		}

		#shrinkTitleRibbonButton {
			cursor: pointer;
		}

		.crmType {
			display: inline-block;
			-webkit-user-select:none;
			-moz-user-select: none;
				-ms-user-select: none;
				user-select: none;
			margin-left:-5px;
			cursor:pointer;
			position: relative;
		}

			.crmType > paper-material {
				cursor: pointer;
			}

			.crmType > paper-material:hover {
				background-color: rgb(220,220,220);
			}

		.crmTypeTxt {
			font-weight: 400;
			text-align: center;
			text-transform: uppercase;
			margin-top:-10px;
			font-size: 74%;
		}

		.crmTypeIcon {
			fill: rgb(125, 125, 125);
		}

		.crmType.toggled .crmTypeTxt {
			font-weight: bold;
		}

		.crmType.toggled .crmTypeIcon {
			fill: black;
		}

		#crmTypeSelector {
			margin-bottom: -2px;
			display: -webkit-box;
			display: -webkit-flex;
			display: flex;
			-webkit-box-pack: center;
			-webkit-justify-content: center;
					justify-content: center;
			position: relative;
			right: -5px;
		}

		#crmEditPageTopTextContainer {
			display: -webkit-box;
			display: -webkit-flex;
			display: flex;
			-webkit-box-pack: justify;
			-webkit-justify-content: space-between;
					justify-content: space-between;
		}

			#crmEditPageTopTextContainer .bigTxt {
				position: relative;
				bottom: -15px;
			}

			#crmTypeSelector, #crmEditPageTopTextContainer .bigTxt {
				display: inline-block;
			}

		.requestPermissionsType {
			font-size: 230%;
			font-weight: 500;
			margin-top: 5px;
		}

		#requestPermissionsHeader {
			line-height: 42px;
			font-size: 250%;
			padding-top: 10px;
		}

		paper-button.blue {
			background-color: #3F51B5;
			color: white;
		}

		paper-button.topoffset {
			margin-top: 6px;
		}

		.scriptPermissionsUsedPermissionsTxt {
			font-size: 150%;
			font-weight: 500;
			padding-bottom: 10px;
		}

		.requestPermissionsPermissionTopCont[is-required] .requestPermissionName {
			text-decoration: underline;
		}

		.scriptPermissionsToggle {
			float: right;
			margin-top: 5px;
		}

		#exportDialog > *:first-child {
			padding-top: 24px;
		}

		textarea {
			width: 1000px;
			resize: none;
			margin-top: 5px;
		}

		.paperTextArea {
			padding: 0;
			margin: 0 24px;
			width: ${calc('(100% - 48px)')};
			outline: none;
			border: none;
			border-bottom: 2px solid rgb(60,60,60);
			padding-bottom: 2px;
			resize: none;
			-webkit-transition: border-color 150ms ease-in-out;
			transition: border-color 150ms ease-in-out;
		}

		textarea#exportJSONData:focus {
			border-bottom: 2px solid rgb(69, 57, 255);
		}

		#warning {
			margin-top: 7px;
		}

		#crmButtons {
			width: 1028px;
		}

		.importSettingsCont paper-checkbox, .exportSettingsCont paper-checkbox {
			margin-top: 10px;
			margin-bottom: 10px;
		}

		#importSettingsError {
			color: red;
			display: none;
			margin-left:10px;
		}

		edit-crm-item {
			display:block;
		}

		edit-crm-item:focus .CRMItemTitle {
			font-weight: bold;
		}

		edit-crm-item:focus .CRMItemTitle[isroot] {
			font-weight: normal;
		}

		.globalExcludeContainer {
			display: -webkit-box;
			display: -webkit-flex;
			display: flex;
		}

		.globalExcludeInput {
			-webkit-box-flex: 100;
			-webkit-flex-grow: 100;
					flex-grow: 100;
		}

		#editorToolsRibbon {
			-webkit-user-select: none;
			-moz-user-select: none;
				-ms-user-select: none;
				user-select: none;
		}

		.CodeMirror-merge .CodeMirror {
			font-size: 100% !important;
		}

		#updateMergeRightNextError, #updateMergeLeftNextError {
			text-align: center;
			font-weight:bold;
			cursor:pointer;
			-webkit-user-select: none;
			-moz-user-select: none;
				-ms-user-select: none;
				user-select: none;
		}

		#updateMergeRightNextError:hover, #updateMergeLeftNextError:hover {
			text-decoration:underline;
		}

		.finalMessage {
			font-size: 200%;
			font-weight: 500;
		}

		#tryOutEditor {
			height: 200px;
		}

		#tryOutEditorPlaceholder {
			position: absolute;
		}

		.try-editor-codemirror.CodeMirror {
			font-size:100%!important;
			height: 200px;
		}

		#stylesheetGif {
			width: 499.5px;
			margin-left: -42px;
		}

		#gifCropper {
			width: 413.5px;
			overflow: hidden;
		}

		.pageCont {
			min-width: 1000px;
		}

		#dialogCopyButton {
			padding-top: 17px;
		}

		#exportInputLine {
			display: -webkit-box;
			display: -webkit-flex;
			display: flex;
			-webkit-box-pack: justify;
			-webkit-justify-content: space-between;
					justify-content: space-between;
		}

		.nodeAddedHeader {
			overflow: visible!important;
			white-space: normal!important;
		}

		.nodeAddedPermissionsCont {
			width: 750px;
			display: inline-block;
			overflow: visible;
			margin-right: 50px;
		}

		#addedPermissionsTabContainer {
			width: 10000px;
			-webkit-transition: margin-left 400ms ease-in-out;
			transition: margin-left 400ms ease-in-out;
		}

		#addedPermissionsDialog {
			overflow: hidden;
		}

		.nodeAddedPermissionCont  {
			margin-top: 20px;
		}

		.nodeAddedPermissionDescription {
			margin-left: 10px;
			margin-top: 5px;
		}

		.codeSyntax {
			padding: 0;
			padding-top: 0.2em;
			padding-bottom: 0.2em;
			margin: 0;
			background-color: rgba(0,0,0,0.04);
			border-radius: 3px;
			padding-left: 4px;
			padding-right: 4px;
		}

		paper-toggle-option #checkboxLabel {
			max-width: 950px;
		}

		.codeSettingsDialog .menuSelectedCheckmar {
			width: 29px;
		}

		.chromeCallsDeprecated {
			color: #E91E63!important;
			text-decoration: underline;
		}

		#docsLink {
			right: 7px;
			position: absolute;
			top: 8px;
			font-size: 150%;
		}

		#exportSettingsSpinner {
			position: absolute;
			width: 1000px;
			height: 166px;
		}

		.exportSettingsSpinnerHorizontalCenterer {
			-webkit-box-pack: center;
			-webkit-justify-content: center;
					justify-content: center;
			display: -webkit-box;
			display: -webkit-flex;
			display: flex;
			-webkit-box-orient: horizontal;
			-webkit-box-direction: normal;
			-webkit-flex-direction: row;
					flex-direction: row;
		}

		#exportCopyButton {
			float: right;
		}

		#showHideToolsRibbonButton {
			padding: 0 8px!important;
		}

		#ribbonScriptName, #ribbonStylesheetName {
			vertical-align: middle;
			display: -webkit-box;
			display: -webkit-flex;
			display: flex;
			height: 100%;
			-webkit-box-orient: vertical;
			-webkit-box-direction: normal;
			-webkit-flex-direction: column;
					flex-direction: column;
			-webkit-box-pack: center;
			-webkit-justify-content: center;
					justify-content: center;
		}

		#ribbonScriptName[hidden], #ribbonStylesheetName[hidden] {
			display: none!important;
		}

		crm-edit-page[hidden] {
			display: none!important;
		}

		paper-checkbox {
			margin-left: 9px;
		}

		.buttons {
			color: rgb(38, 153, 244);
			display: -webkit-box;
			display: -webkit-flex;
			display: flex;
			-webkit-box-orient: horizontal;
			-webkit-box-direction: normal;
			-webkit-flex-direction: row;
					flex-direction: row;
			-webkit-box-pack: end;
			-webkit-justify-content: flex-end;
					justify-content: flex-end;
			position: relative;
			padding: 8px 8px 8px 24px;
			margin: 0;
		}

		#fullscreenEditorButtons, #titleRibbonEnd {
			display: -webkit-box;
			display: -webkit-flex;
			display: flex;
		}

		#fullscreenEditorButtons {
			margin-right: 20px;
			height: 39px;
			padding: 0 5px;
		}

		#fullscreenEditorButtons > div {
			padding: 0 6px;
			padding-top: 4px;
			cursor: pointer;
			background-color: white;
		}

		#fullscreenEditorButtons > div:hover {
			background-color: #dbdbdb;
		}

		#fullscreenEditorToggle {
			margin-top: -3px;
		}

		#fullscreenEditorSettings {
			margin-top: 5px;
		}

		#fullscreenEditorSettings svg {
			-webkit-transform: translateY(-10px);
			transform: translateY(-10px);
		}

		.paper-material {
			display: inline;
		}

		#editorThemeSettingTxt, #editorThemeSettingChoicesCont, .editorThemeSetting, #editorTabsOrSpacesTxt, #editorTabsOrSpacesCheckbox, #editorUseLineNumbersCheckbox, #editorUseLineNumbersTxt {
			display: inline-block;
		}

		.editorThemeSetting {
			border: 2px solid rgb(128,128,128);
			width: 16px;
			height: 16px;
			margin-left: 5px;
			margin-bottom: -3px;
			cursor: pointer;
		}

			.editorThemeSetting.currentTheme {
				border: 2px solid rgb(255,165,0);
			}

		#editorThemeSettingWhite {
			background-color: white;
		}

		#editorThemeSettingDark {
			background-color: rgb(30,30,30);
		}

		.editorSettingsTxt {
			font-size: 250%;
			font-weight: 500;
			padding-bottom: 10px;
		}

		#editorTabsOrSpacesTxt, #editorUseLineNumbersTxt {
			margin-left: 10px;
		}

		#editorTabSizeInput {
			width: 250px;
		}

		#editorOptions {
			z-index: 30;
			background-color: rgb(255, 255, 255);
			font-family: 'Roboto';
			padding: 10px;
			font-size:15px;
			width: 500px;
			height: 100vh;
		}

		#fullscreenSettingsContainer {
			right: 0;
			-webkit-transform: translateX(500px);
			transform: translateX(500px);
			position: absolute;
			z-index: 500;
			transition: transform 300ms ease-in, -webkit-transform 300ms ease-in;
			width: 500px;
			height: 100vh;
		}

		*[hidden] {
			display: none!important;
		}

		#restoreChangesEditor {
			height: ${calc('(100vh - 500px)')};
			width: ${calc('(100vw - 500px)')};
		}

		.halfDivider {
			display: -webkit-box;
			display: -webkit-flex;
			display: flex;
		}

		.half {
			width: 50%;
		}

		#restoreChangesDialog #restoreChangesHeader h2 {
			margin: 0;
		}

		.bold {
			font-weight: bold;
		}

		#editorTypescript {
			font-size: 70%;
		}

		#editorTypescript.active {
			background-color: rgb(200, 200, 200);
			color: #2699f4;
		}

		#editorTypescript:hover {
			background-color: rgb(230, 230, 230);
		}

		app-header {
			right: 0!important;
		}

		.optionMetaDescr {
			font-weight: bold;
			font-size: 150%;
		}

		.optionPading {
			margin-top: 8px;
		}

		#codeSettingsOptions {
			max-height: 60vh;
			overflow-y: scroll;
			padding-top: 10px;
			padding-bottom: 10px;
		}

		.badBrowserBanner {
			text-align: center;
			background-color: #ff4f00;
		}			
	</style>`
}, CHANGE_TYPE.THEME, render);
