
//  var a="Chandani Mourya";
// var i=0;
// function type()
// {
// 	// for(int d=0; d<=Infinity;d++){
// document.getElementById("cursive").innerHTML
// +=a.charAt(i);
//     i++;
//     setTimeout(type,150)
// }
// // }
// type();
// Sets age automatically

// const age=()=>{
	// Get Current Date
// 	let date=new Date();
// 	let today_date=date.getDate();
// 	let month=date.getMonth()+1;
// 	let year=date.getFullYear();
// 	//Check if birthdate has already passed 
// 	if(today_date>=12 && month>=12){
// 		// Today's date>15 
// 			//month after october(so age= year-born year)
			
// 			document.getElementsByClassName('age')[0].innerText=`${year-2000} Years`;	
// 			// document.getElementsByClassName('age')[1].innerText=`${year-2000} Years`;

// 	}else{
// 		if(month>12){
// 			document.getElementsByClassName('age')[0].innerText=`${year-2000} Years`;
// 			// document.getElementsByClassName('age')[1].innerText=`${year-2000} Years`;		


// 		}else{
// 			document.getElementsByClassName('age')[0].innerText=`${year-2000-1} Years`;
// 			// document.getElementsByClassName('age')[1].innerText=`${year-2000-1} Years`;
			

// 		}
// 	}
// }
//  const age=()=>{
// 	// Get Current Date
// 	let date=new Date();
// 	let today_date=date.getDate();
// 	let month=date.getMonth()+1;
// 	let year=date.getFullYear();
// 	//Check if birthdate has already passed 
// 	if(today_date>=12 && month>=12){
// 		// Today's date>12
// 			//month after october(so age= year-born year)
// 		document.getElementsByClassName('age')[0].innerText=`${year-2000} Years`;

// 	}
// 	else{
// 		if(month>12){
// 			document.getElementsByClassName('age')[0].innerText=`${year-2000} Years`;
// 		}
// 		else{
// 			document.getElementsByClassName('age')[0].innerText=`${year-2000-1} Years`;
// 		}
// 	}
// }
window.onload=()=>{
	AOS.init();
	// age();
}

// Add Skills
const skill=[
		{
		'id':'0',
		'image_url':"./logo/icons8-react-native.svg",
		'alt':'React',
		'title':'React'
		},
		{
		'id':'1',
		'image_url':"./logo/js.svg",
		'alt':'Javascript',
		'title':'Javascript'
		},
		{
		'id':'2',
		'image_url':"./logo/html-5-01.svg",
		'alt':'HTML',
		'title':'HTML'
		},
		{
		'id':'3',
		'image_url':"./logo/css3-alter.svg",
		'alt':'CSS',
		'title':'CSS'
		},
		{
		'id':'4',
		'image_url':"./logo/Bootstrap.svg",
		'alt':'BootStrap',
		'title':'BootStrap'
		},
		{
		'id':'5',
		'image_url':"./logo/node.svg",
		'alt':'Node.js',
		'title':'Node.js'
		},
		{
		'id':'6',
		'image_url':"./logo/mongodb-alt.svg",
		'alt':'Mango DB',
		'title':'Mango DB'
		},
		{
		'id':'7',
		'image_url':"./logo/git.svg",
		'alt':'Git',
		'title':'Git'
		},
		{
		'id':'8',
		'image_url':"./logo/phython.svg",
		'alt':'Python',
		'title':'Python'
		},
		{
		'id':'9',
		'image_url':"./logo/java-alt.svg",
		'alt':'Java',
		'title':'Java'
		},
		// {
		// 'id':'10',
		// 'image_url':"",
		// 'alt':'React'
		// },
		{
		'id':'10',
		'image_url':"./logo/sqlserver.svg",
		'alt':'SQL',
		'title':'SQL'
		},
		{
		'id':'11',
		'image_url':"./logo/php-edit.svg",
		'alt':'PHP',
		'title':'PHP'
		},
		{
		'id':'12',
		'image_url':"./logo/less-seeklogo.com.svg",
		'alt':'LESS',
		'title':'LESS'
		},
		{
		'id':'13',
		'image_url':"./logo/sass.svg",
		'alt':'SASS',
		'title':'SASS'
		},
		{
		'id':'14',
		'image_url':"./logo/icons8-firebase.svg",
		'alt':'FireBase',
		'title':'FireBase'
		},
		{
		'id':'15',
		'image_url':"./logo/figma-alter.svg",
		'alt':'Figma',
		'title':'Figma'
		}
];
	for(let i of skill){
		let skill_container = document.getElementsByClassName("skill_container");
		let skill_card= document.createElement('div');
		skill_card.classList.add( 'card','skill_card');
		skill_card.setAttribute('data-toggle','tooltip');
		skill_card.setAttribute('data-placement','bottom');
		skill_card.setAttribute('title',i.title);
		let skill_image= document.createElement('img');
		skill_image.classList.add('skill_image','image');
		skill_image.setAttribute('src',i.image_url);
		skill_image.setAttribute('alt',i.alt);
		// 'data-toggle':"tooltip",
		// 'data-placement':"bottom"

		// i.image_url 
		skill_card.appendChild(skill_image);
		skill_container[0].appendChild(skill_card);
	}