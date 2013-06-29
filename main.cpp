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

#include <diegocr.h>
#include <sapi.h>

const CLSID CLSID_SpVoice =
	{ 0x96749377, 0x3391, 0x11D2,
		{ 0x9E, 0xE3, 0x00, 0xC0, 0x4F, 0x79, 0x73, 0x96 }};

const IID IID_ISpVoice =
	{ 0x6C44DF74, 0x72B9, 0x4992,
		{ 0xA1, 0xEC, 0xEF, 0x99, 0x6E, 0x04, 0x22, 0xD4 }};

DLL_EXPORT int Speak(TCHAR *aText, DWORD aFlags)
{
	int rc = 0;
	
	if(SUCCEEDED(CoInitialize(NULL)))
	{
		ISpVoice * pVoice = NULL;
		HRESULT hr = CoCreateInstance(&CLSID_SpVoice, NULL, CLSCTX_ALL, &IID_ISpVoice, (void **)&pVoice);
		
		if( SUCCEEDED( hr ) )
		{
			hr = pVoice->lpVtbl->Speak(pVoice, aText, aFlags, NULL);
			
			pVoice->lpVtbl->Release(pVoice);
			
			rc = !!SUCCEEDED( hr );
		}
		
		CoUninitialize();
	}
	
	return rc;
}

DLL_EXPORT BOOL APIENTRY DllMain( HANDLE hModule UNUSED, DWORD reasonForCall UNUSED, LPVOID lpReserved UNUSED)
{
	return true;
}
