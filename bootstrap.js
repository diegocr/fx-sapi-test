/* ***** BEGIN LICENSE BLOCK *****
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/
 * 
 * Contributor(s):
 *   Diego Casorran <dcasorran@gmail.com> (Original Author)
 *
 * ***** END LICENSE BLOCK ***** */

Components.utils.import("resource://gre/modules/Services.jsm");
Components.utils.import("resource://gre/modules/ctypes.jsm");

let DLL, Speak;

let /* enum SPEAKFLAGS */
	SPF_DEFAULT           = 0x00000000,
	SPF_ASYNC             = 0x00000001,
	SPF_PURGEBEFORESPEAK  = 0x00000002,
	SPF_IS_FILENAME       = 0x00000004,
	SPF_IS_XML            = 0x00000008,
	SPF_IS_NOT_XML        = 0x00000010,
	SPF_PERSIST_XML       = 0x00000020,
	SPF_NLP_SPEAK_PUNC    = 0x00000040,
	SPF_NLP_MASK          = 0x00000040,
	SPF_VOICE_MASK        = 0x0000007f,
	SPF_UNUSED_FLAGS      = 0xffffff80;

function startup(data) {
	try {
		DLL = ctypes.open(Services.io.newURI(__SCRIPT_URI_SPEC__+'/../fxsapi.dll',null,null)
				.QueryInterface(Components.interfaces.nsIFileURL).file.path);
		
		Speak = DLL.declare("Speak", ctypes.default_abi, ctypes.int32_t, ctypes.jschar.ptr, ctypes.unsigned_long);
		
		Speak("Welcome to Firefox", SPF_DEFAULT );
		
	} catch(e) {
		Components.utils.reportError(e);
	}
}

function shutdown(aData, aReason) {
	if(DLL) {
		Speak("Goodbye, Have <pitch middle = '-10'/> a nice day.", SPF_IS_XML );
		DLL.close();
	}
}

function install(aData, aReason) {}
function uninstall(aData, aReason) {}
