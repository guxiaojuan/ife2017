// js操作xml



function menu(){
	this.xmlData = null;
	this.IE = /msie/i.test(navigator.userAgent);
	this.checkedList = '';
	this.ID = '';
	this.hideLink = true;
	this.linkTarget = 'mainFrame';
	this.hideCheckbox = true;
	this.hide = true;
}
menu.prototype = {
	loadData: function(xmlPath, v,pid){
		this.obj = this.get(v);
		this.obj.className += ' tree';
		if(this.xmlData==null){
			var xml = this.createXMLDom();
			xml.async = true;
			var tXML = this;
			if(this.IE){
				xml.onreadystatechange = function(){
					if(xml.readyState==4){
						tXML.xmlData = xml;
						tXML.render(tXML.obj, "/xml/row[@at_fatherid='"+ pid + "']", true);
					}
				};
			}else{
				xml.onload = function(){
					tXML.xmlData = xml;
					tXML.render(tXML.obj, "/xml/row[@at_fatherid='"+ pid + "']", true);
				};
			}
			xml.load(xmlPath);
		}
	},
	render: function(o, xPath, style){
		o.innerHTML = '';
		var level = this.selectNodes(this.xmlData.documentElement, xPath);
		var j=level.length;
		if(j<1)return false;
		var tDom = document.createDocumentFragment();
		var tNode, tId, tName, tType, tCheck, tLink, pType, tName;
		var _T = this;
		var ieFIx = [];
		for(var i=0; i<j; i++){
			tNode = level[i];
			if(this.hide && this.getAtt(tNode, 'at_show') && this.getAtt(tNode, 'at_show')=='0')continue;
			tId = this.getAtt(tNode, 'at_id');
			tName = this.getAtt(tNode, 'at_showname');
			tType = this.getAtt(tNode, 'nodetype');
			ptype = this.getAtt(tNode, 'p_type');
			tName = (ptype=='isPid')?'<a onclick="return showPermissionDetail('+tId+')" class="pCkName">'+tName+'</a>':tName;
			tLink = this.getAtt(tNode, 'at_url');
			tCheck = this.checkedList.indexOf(','+tId+',')>=0;
			if(tCheck && this.IE){
				ieFIx.push(tId);
			}
			if(tType == 'node'){
				tDom.appendChild(
					this.create('div').appendChild(
						this.create('div', {onclick: function(e){_T.stopEvent(e);_T.show.call(_T, this)}, className: 'node_open'+(i+1==j?'_end':''),id:tId, value:tId}).appendChild(
							this.create('input', {style:{display:(this.hideCheckbox?'none':'')}, type:'checkbox', checked:tCheck, onclick: function(e){_T.stopEvent(e);_T.check.call(_T, this)}, value:tId, id:this.ID+'_chk_'+tId})
						).appendChild(this.create('label', {style:{fontWeight:(style?'bold':'normal')}, innerHTML:((this.hideLink ||tLink=='')?this.addHTML(tName):('<a href="'+tLink+'" target="'+this.linkTarget+'">'+tName+'</a>')), value:tId}))
					).appendChild(
						this.create('div', {className:'node_sub'+(i+1==j?'_end':''), id:this.ID+'_'+tId+'_sub'})
					)
				);
				o.appendChild(tDom);
				var tObj = this.get(this.ID+'_'+tId+'_sub');
				this.render(tObj, '//row[@at_fatherid="'+tId+'"]');
				tObj.style.display = 'block';//展开
			}else{
				tDom.appendChild(
					this.create('div').appendChild(
						this.create('div', {onclick: function(e){_T.stopEvent(e)}, className: 'page'+(i+1==j?'_end':''), value:tId}).appendChild(
							this.create('input', {style:{display:(this.hideCheckbox?'none':'')},type:'checkbox', checked:tCheck, onclick: function(e){_T.stopEvent(e);_T.check.call(_T, this)}, value:tId, id:this.ID+'_chk_'+tId})
						).appendChild(this.create('label', {style:{fontWeight:(style?'bold':'normal')}, innerHTML:((this.hideLink ||tLink=='')?this.addHTML(tName):('<a href="'+tLink+'" target="'+this.linkTarget+'">'+tName+'</a>')), value:tId}))
					)
				);
				o.appendChild(tDom);
			}
		}
		o.appendChild(tDom);
		if(this.IE){//修补在IE下checkbox选中的问题
			for(var k=0,m=ieFIx.length; k<m; k++){
				this.get(this.ID+'_chk_'+ieFIx[k]).checked = true;
			}
		}
		tDom = null;
		return true;
	},
	stopEvent: function(e){
		if(e){e.stopPropagation()}else{window.event.cancelBubble = true;}
	},
	show: function(v){
		o = v.value;
		var tObj = this.get(this.ID+'_'+o+'_sub');
		if(tObj){
			if(tObj.innerHTML == ''){
				if(this.render(tObj, '//row[@at_fatherid="'+o+'"]') && tObj.innerHTML != ''){
					tObj.style.display = 'block';//展开
				}
				v.className = v.className == 'node'?'node_open':(v.className == 'node_end'?'node_open_end':'node_end');
			}else{
				if(tObj.style.display == 'block'){//关闭
					tObj.style.display = 'none';
					v.className = v.className == 'node_open_end'?'node_end':(v.className == 'node_open'?'node':'node_open_end');
					var x = tObj.getElementsByTagName('div');
					for(var i=0,j=x.length; i<j; i++){
						if(x[i].className && x[i].className.indexOf('node')!=-1 && x[i].className.indexOf('open')!=-1){
							x[i].className = x[i].className.replace(/_open/g, '');
							x[i].nextSibling.style.display = 'none';
						}
					}
				}else{
					tObj.style.display = 'block';//展开
					v.className = v.className == 'node'?'node_open':(v.className == 'node_end'?'node_open_end':'node_end');
				}
			}
		}
	},
	showCkNode: function(type,o){
		var tObj = this.get(this.ID+'_'+o+'_sub');
		var cnaObj = this.get(this.ID+o);
		if(tObj){
			if(this.render(tObj, '//row[@at_fatherid="'+o+'"]') && tObj.innerHTML != ''){
				if(type==0){
					tObj.style.display = 'block';//展开
					cnaObj.className = cnaObj.className == 'node'?'node_open':(cnaObj.className == 'node_end'?'node_open_end':cnaObj.className);
				}else if(type==1){
					tObj.style.display = 'none';//关闭
					cnaObj.className = cnaObj.className == 'node_open'?'node':(cnaObj.className == 'node_open_end'?'node_end':cnaObj.className);
				}
			}
		}
	},
	check: function(o){
		if(o.checked){
			this.checkedList += o.value+',';
			this.reCheck(o);
		}else{
			this.checkedList = this.checkedList.replace(o.value+',', '');
		}
	},
	getChecked: function(){
		return this.checkedList.replace(/^,*|,*?$/g, '').replace(/,+/g, ',');
	},
	reCheck: function(o){
		var parent = o.parentNode.parentNode.parentNode.parentNode.firstChild;
		if(parent.id){
			if(!parent.firstChild.checked){
				parent.firstChild.checked = true;
				this.checkedList += parent.firstChild.value+',';
			}
			this.reCheck(parent.firstChild);
		}
	},
	getAllID: function(){
		if(!this.xmlData)return '';
		if(this.allID)return(this.allID.join(','));
		var allID = this.selectNodes(this.xmlData.documentElement, '//row');
		var allLL = allID.length;
		this.allID = [];
		for(var i=0; i<allLL; i++){
			this.allID[i] = this.getAtt(allID[i], 'at_id');
		}
		return(this.allID.join(','));
	},
	getAllTreeID: function(){//所有树ID
		if(!this.xmlData)return '';
		if(this.allExpectPID)return(this.allExpectPID.join(','));
		var allExpectPID = this.selectNodes(this.xmlData.documentElement, '//row');
		var allLL = allExpectPID.length;
		this.allExpectPID = [];
		for(var i=0; i<allLL; i++){
			if(this.getAtt(allExpectPID[i], 'p_type')=='isNid'){
				this.allExpectPID[i] = this.getAtt(allExpectPID[i], 'at_id');
			}
		}
		return(this.allExpectPID.join(','));
	},
	selectNodes:function(node, xPath){
		if(this.IE){
			return node.selectNodes(xPath);
		}else{
			var r = node.nodeType == 9;
			var doc = r ? node : node.ownerDocument;
			var nsRes = doc.createNSResolver(r ? node.documentElement : node);
			var xpRes = doc.evaluate(xPath, node, nsRes, 5, null);
			var res = [];
			var item;
			while (item = xpRes.iterateNext())	{
				res[res.length] = item;
			}
			return res;
		}
	},
	getAtt: function(node, att){
		return node.getAttribute(att);
	},
	createXMLDom: function(){
		if(this.IE){
			var a = ["MSXML2.DOMDocument", "Microsoft.XMLDOM", "MSXML.DOMDocument", "MSXML3.DOMDocument"];
			for (var i=0,l=a.length;i<l;i++){
				try{
					return new ActiveXObject(a[i]);
				}catch(e){};
			}
			return null;
		}else{
			return document.implementation.createDocument("","doc",null);
		}
	},
	create: function(tag, j){
		try{
			var node = document.createElement(tag);
			if(typeof(j) == 'object'){
				var attribute, i, k;
				for(i in j){
					if(typeof(j[i]) == 'object'){
						attribute = j[i];
						for(k in attribute){
							node[i][k] =  attribute[k];
						}
					}else{
						node[i] = j[i];
					}
				}
			}
			node.append = node.appendChild;
			node.appendChild = function(o){
				return this.append(o).parentNode;
			};
			return node;
		}finally{
			node = null;
		}
	},
	get:function(v){
		return document.getElementById(v);
	},
	changeURL:function(url){
		return url;
	},
	addHTML:function(s){
		return s=='客服问题'?(s+'<span id="feedback"></span>'):s;
	}
}