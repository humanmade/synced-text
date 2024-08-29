(()=>{"use strict";const e=window.wp.editPost,t=window.wp.components,n=window.wp.element,s=window.wp.data,i=window.wp.i18n,a=window.wp.plugins,c=window.ReactJSXRuntime;(0,a.registerPlugin)("synced-text-sidebar",{render:function(){const[a,o]=(0,n.useState)({}),[r,d]=(0,n.useState)(""),[l,x]=(0,n.useState)(!1),[y,u]=(0,n.useState)(!1),w=(0,s.useSelect)((e=>{const t=e("core").getSite()?.syncedText||{};return o(t),t}),[]),{saveSite:p}=(0,s.useDispatch)("core"),g=(0,s.useSelect)((e=>e("core").canUser("update","settings")));return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(e.PluginSidebarMoreMenuItem,{target:"synced-text-sidebar",children:(0,i.__)("Synced Text","synced-text")}),(0,c.jsxs)(e.PluginSidebar,{name:"synced-text-sidebar",title:(0,i.__)("Synced Text","synced-text"),children:[g&&(0,c.jsx)(t.PanelBody,{children:(0,c.jsx)(t.Button,{onClick:()=>{u(!0),p({syncedText:a}),setTimeout((()=>u(!1)),800)},variant:"primary",disabled:JSON.stringify(a)===JSON.stringify(w)||y,icon:y?"hourglass":"saved",children:y?(0,i.__)("Saving…","synced-text"):(0,i.__)("Save Changes","synced-text")})}),Object.keys(a).map((e=>(0,c.jsxs)(t.PanelBody,{children:[(0,c.jsx)(t.TextControl,{label:`{${e}}`,value:a[e]||"",readOnly:!g,onChange:t=>{const n={...a,[e]:t};o(n)}}),(0,c.jsxs)(t.PanelRow,{children:[(0,c.jsx)(t.ClipboardButton,{variant:"tertiary",size:"small",text:`{${e}}`,onCopy:()=>x(!0),onFinishCopy:()=>x(!1),children:l?"Copied!":"Copy placeholder"}),g&&(0,c.jsx)(t.Button,{isDestructive:!0,onClick:()=>(e=>{const t={...a};delete t[e],o(t)})(e),variant:"tertiary",icon:"trash",size:"small",iconSize:14,children:(0,i.__)("Remove","synced-text")})]})]},e))),g&&(0,c.jsxs)(t.PanelBody,{children:[(0,c.jsx)(t.TextControl,{label:(0,i.__)("New key name","synced-text"),value:r,onChange:d}),(0,c.jsx)(t.Button,{onClick:()=>{const e=r.toLowerCase().replace(/\s+/g,"_").replace(/[^a-z0-9_-]+/g,"");o({...a,[e]:""}),d("")},variant:"secondary",icon:"",children:(0,i.__)("Add","synced-text")})]})]})]})},icon:"embed-generic"})})();