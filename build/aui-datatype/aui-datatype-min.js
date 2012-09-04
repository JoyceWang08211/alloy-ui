AUI.add("aui-datatype",function(b){var k=b.Lang,i="false",f="true",c=60,j=1000,e=24,h=b.namespace("DataType.Boolean"),m=b.namespace("DataType.String");h.parse=function(p){p=b.Lang.trim(p);return(p==i)?false:!!p;};m.evaluate=function(r){var p=b.Lang.trim(r);if(p==f||p==i){return h.parse(r);}if(p&&k.isString(p)){var q=+p;if(!isNaN(q)){return q;}}return r;};var k=b.Lang,g=b.Lang.String,o=k.isDate,l=k.isValue,d=":",a="am",n="pm";b.namespace("DataType.DateMath");b.mix(b.DataType.DateMath,{DAY:"D",WEEK:"W",YEAR:"Y",MONTH:"M",MINUTES:"MINUTES",HOUR:"HOUR",SECONDS:"SECONDS",MAX_MONTH_LENGTH:31,WEEK_LENGTH:7,ONE_DAY_MS:j*c*c*e,ONE_HOUR_MS:j*c*c,ONE_MINUTE_MS:j*c,ONE_SECOND_MS:j,WEEK_ONE_JAN_DATE:1,add:function(p,u,r){var t=new Date(p.getTime());switch(u){case this.MONTH:var x=p.getMonth()+r;var s=0;if(x<0){while(x<0){x+=12;s-=1;}}else{if(x>11){while(x>11){x-=12;s+=1;}}}t.setMonth(x);t.setFullYear(p.getFullYear()+s);break;case this.DAY:this._addDays(t,r);break;case this.YEAR:t.setFullYear(p.getFullYear()+r);break;case this.WEEK:this._addDays(t,(r*7));break;case this.HOUR:var v=t.getHours();t.setHours(v+r);break;case this.MINUTES:var q=t.getMinutes();t.setMinutes(q+r);break;case this.SECONDS:var w=t.getSeconds();t.setSeconds(w+r);break;}return t;},_addDays:function(s,r){if(b.UA.webkit&&b.UA.webkit<420){if(r<0){for(var q=-128;r<q;r-=q){s.setDate(s.getDate()+q);}}else{for(var p=96;r>p;r-=p){s.setDate(s.getDate()+p);}}}s.setDate(s.getDate()+r);},compare:function(q,p){return(q&&p&&(q.getTime()==p.getTime()));},copyHours:function(r,q){var p=this;r.setHours(q.getHours());r.setMinutes(q.getMinutes());r.setSeconds(q.getSeconds());r.setMilliseconds(q.getMilliseconds());},subtract:function(p,r,q){return this.add(p,r,(q*-1));},before:function(r,q){var p=q.getTime();if(r.getTime()<p){return true;}else{return false;}},after:function(r,q){var p=q.getTime();if(r.getTime()>p){return true;}else{return false;}},between:function(q,p,r){if(this.after(q,p)&&this.before(q,r)){return true;}else{return false;}},getJan1:function(p){return this.getDate(p,0,1);},getDayOffsetYear:function(p,r){var q=this.getJan1(r);return this.getDayOffset(p,q,r);},getDayOffset:function(q,p){return this._absFloor(this.getOffset(q,p,this.ONE_DAY_MS));},getHoursOffset:function(q,p){return this._absFloor(this.getOffset(q,p,this.ONE_HOUR_MS));},getMinutesOffset:function(q,p){return this._absFloor(this.getOffset(q,p,this.ONE_MINUTE_MS));},getSecondsOffset:function(q,p){return this._absFloor(this.getOffset(q,p,this.ONE_SECOND_MS));},getOffset:function(r,q,p){var s=(r.getTime()-q.getTime())/(p||0);return s;},_absFloor:function(q){var p=Math.floor(Math.abs(q));if(q<0){p*=-1;}return p;},getWeekNumber:function(t,q,w){q=q||0;w=w||this.WEEK_ONE_JAN_DATE;var x=this.clearTime(t),B,C;if(x.getDay()===q){B=x;}else{B=this.getFirstDayOfWeek(x,q);}var y=B.getFullYear(),r=B.getTime();C=new Date(B.getTime()+6*this.ONE_DAY_MS);var v;if(y!==C.getFullYear()&&C.getDate()>=w){v=1;}else{var u=this.clearTime(this.getDate(y,0,w)),p=this.getFirstDayOfWeek(u,q);var z=Math.round((x.getTime()-p.getTime())/this.ONE_DAY_MS);var A=z%7;var s=(z-A)/7;v=s+1;}return v;},getFirstDayOfWeek:function(s,p){p=p||0;var q=s.getDay(),r=(q-p+7)%7;return this.subtract(s,this.DAY,r);},isWeekDay:function(q){var p=q.getDay();return(p>0)&&(p<6);},isTueOrThu:function(p){return this.isWeekDay(p)&&(p.getDay()%2===0);},isMonWedOrFri:function(p){return this.isWeekDay(p)&&!this.isTueOrThu(p);},isNextDay:function(q,p){return this.getDayOffset(this.safeClearTime(p),this.safeClearTime(q))===1;},isDayBoundary:function(q,p){return this.isNextDay(q,p)&&(p.getHours()===0)&&(p.getMinutes()===0)&&(p.getSeconds()===0);},isDayOverlap:function(q,p){return((q.getFullYear()!==p.getFullYear())||(q.getMonth()!==p.getMonth())||(q.getDate()!==p.getDate()));},isToday:function(p){return !this.isDayOverlap(p,new Date());},isSameMonth:function(q,p){return((q.getFullYear()===p.getFullYear())&&(q.getMonth()===p.getMonth()));},isYearOverlapWeek:function(p){var r=false;var q=this.add(p,this.DAY,6);if(q.getFullYear()!=p.getFullYear()){r=true;}return r;},isMonthOverlapWeek:function(p){var r=false;var q=this.add(p,this.DAY,6);if(q.getMonth()!=p.getMonth()){r=true;}return r;},findMonthStart:function(p){var q=this.getDate(p.getFullYear(),p.getMonth(),1);return q;},findMonthEnd:function(q){var s=this.findMonthStart(q);var r=this.add(s,this.MONTH,1);var p=this.subtract(r,this.DAY,1);p.setHours(23,59,59,999);return p;},clearTime:function(p){p.setHours(12,0,0,0);return p;},safeClearTime:function(p){return this.clearTime(this.clone(p));},toMidnight:function(p){p.setHours(0,0,0,0);return p;},clone:function(p){return new Date(p.getTime());},getDate:function(s,p,r){var q=null;if(!l(r)){r=1;}if(s>=100){q=new Date(s,p,r);}else{q=new Date();q.setFullYear(s);q.setMonth(p);q.setDate(r);q.setHours(0,0,0,0);}return q;},getDaysInMonth:function(p,q){return this.findMonthEnd(this.getDate(p,q)).getDate();},toUsTimeString:function(r,w,t,v){r=o(r)?r:new Date(0,0,0,r);var q=r.getHours();var s=r.getMinutes();var p=false;if(q>=12){p=true;if(q>12){q-=12;}}else{if(q===0){q=12;}}var u=w?g.padNumber(q,2):String(q);if(!t){u+=d;u+=g.padNumber(s,2);}if(!v){u+=(p?n:a);}return u;},toIsoTimeString:function(r,q){r=o(r)?r:new Date(0,0,0,r);var p=r.getHours();var s=r.getMinutes();var t=g.padNumber(p,2)+d+g.padNumber(s,2);if(q){var u=r.getSeconds();t+=d;t+=g.padNumber(u,2);}return t;}});},"@VERSION@",{skinnable:false,requires:["aui-base","datatype"]});