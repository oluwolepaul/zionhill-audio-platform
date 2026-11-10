// Original, flat controls. Visible labels and ARIA names remain on their buttons.
const paths={
 play:'<path d="m8 5 11 7-11 7Z" fill="currentColor" stroke="none"/>',
 pause:'<rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" stroke="none"/><rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" stroke="none"/>',
 stop:'<rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor" stroke="none"/>',
 share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 10.5 6.8-4M8.6 13.5l6.8 4"/>',
 telegram:'<path d="m21 3-7 18-4-8-8-3Z"/><path d="m10 13 11-10"/>',
 close:'<path d="m6 6 12 12M18 6 6 18"/>',
 download:'<path d="M12 3v12m-5-5 5 5 5-5M4 16v4h16v-4"/>',
 restart:'<path d="M4 10a8 8 0 1 1 1 8M4 4v6h6"/>',
 back:'<path d="m11 5-7 7 7 7M4 12h16"/>',
 plus:'<path d="M12 5v14M5 12h14"/>',
 up:'<path d="m6 12 6-6 6 6M12 6v14"/>',
 down:'<path d="m6 12 6 6 6-6M12 4v14"/>',
 external:'<path d="M14 4h6v6m0-6-9 9M10 4H4v16h16v-6"/>',
 mic:'<rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 10v2a7 7 0 0 0 14 0v-2M12 19v3m-4 0h8"/>',
 'mic-off':'<path d="m3 3 18 18M9 9v3a3 3 0 0 0 5 2M9 5a3 3 0 0 1 6 1v5M5 10v2a7 7 0 0 0 11.8 5M19 10v2c0 .8-.1 1.5-.4 2.2M12 19v3m-4 0h8"/>',
 headphones:'<path d="M4 14v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="12" width="4" height="8" rx="2"/><rect x="17" y="12" width="4" height="8" rx="2"/>',
 waveform:'<path d="M4 10v4m4-8v12m4-16v20m4-16v12m4-8v4"/>',
 live:'<path d="M5.6 5.6a9 9 0 0 0 0 12.8m12.8-12.8a9 9 0 0 1 0 12.8M8.4 8.4a5 5 0 0 0 0 7.2m7.2-7.2a5 5 0 0 1 0 7.2"/><circle cx="12" cy="12" r="1.7" fill="currentColor" stroke="none"/>',
 calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 10h18"/>',
 lock:'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
 'skip-back':'<path d="M4 9a8 8 0 1 1 0 7M4 4v5h5"/><text x="12.5" y="16" fill="currentColor" stroke="none" text-anchor="middle" font-family="Arial,sans-serif" font-size="8.5" font-weight="700">15</text>',
 'skip-forward':'<path d="M20 9a8 8 0 1 0 0 7m0-12v5h-5"/><text x="11.5" y="16" fill="currentColor" stroke="none" text-anchor="middle" font-family="Arial,sans-serif" font-size="8.5" font-weight="700">15</text>'
};
export const flatIcon=name=>'<svg class="ui-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">'+(paths[name]||paths.waveform)+'</svg>';
export function iconLabel(element,name,label){element.innerHTML=flatIcon(name)+'<span class="control-label">'+String(label).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))+'</span>'}
