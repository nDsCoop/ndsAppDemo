(this.webpackJsonpweatherapp=this.webpackJsonpweatherapp||[]).push([[5],{993:function(e,t,a){"use strict";a.r(t);var n=a(168),i=a(7),c=a(1),r=a.n(c),s=a(116),o=a(35),l=a(863),d=a(949),p=a(981),u=a(915),m=a(121),h=a(904),v=new(0,a(989).XmlEntities),b={open:{y:0,opacity:1,transition:{y:{stiffness:1e3,velocity:-100}}},closed:{y:50,opacity:1,transition:{y:{stiffness:1e3}}}},y={open:{transition:{staggerChildren:.07,delayChildren:.2}},closed:{transition:{staggerChildren:.05,staggerDirection:-1}}};t.default=function(e){var t=e.videos,a=Object(s.c)(!1,!0),f=Object(i.a)(a,2),g=f[0],E=f[1],x=Object(c.useContext)(o.a),j=Object(i.a)(x,2);Object(n.a)(j[0]);var w=j[1],T=function(e){var t;t={id:e.id.videoId,title:v.decode(e.snippet.title),channelTitle:v.decode(e.snippet.channelTitle),maxThumbnail:"https://img.youtube.com/vi/".concat(e.id.videoId,"/maxresdefault.jpg"),sdThumbnail:"https://img.youtube.com/vi/".concat(e.id.videoId,"/sddefault.jpg")},w({type:"setCurrentVideoSnippet",snippet:t})};r.a.useEffect((function(){setTimeout((function(){}),100),E(!0)}),[]);var C=t.map((function(e){var t=e.snippet;return r.a.createElement(s.b.div,{variants:b,key:e.id.videoId},r.a.createElement(l.a,{alignItems:"flex-start",button:!0,onClick:function(){return T(e)},to:{pathname:"/ndsweb/music/play",search:"?id=".concat(e.id.videoId)}},r.a.createElement(d.a,null,r.a.createElement(p.a,{className:"searchThumb",style:{width:"60px",height:"60px",marginRight:"15px"},alt:t.title,src:t.thumbnails.high.url})),r.a.createElement(u.a,{primary:v.decode(t.title),secondary:r.a.createElement(r.a.Fragment,null,r.a.createElement(m.a,{component:"span",variant:"body2",color:"textPrimary"},t.channelTitle))})),r.a.createElement(h.a,null))}));return r.a.createElement(s.b.div,{variants:y,initial:!1,animate:g?"open":"closed"},C)}}}]);
//# sourceMappingURL=5.8aa9ba8f.chunk.js.map