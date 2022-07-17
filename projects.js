let proj={
	row1:[
		{
		'id':'0',
		'project_Title':'Chat-Bot',
		'project_Description':'A Chat-Bot developed using Node.js & Express as part of my internship at  Cloud Counselage.Pvt.Ltd',
		'project_Image_alt':'This is a ChatBot project & here is the ChatBot Images.',
		'project_tag':'Completed',
		'project_Image':'./Images/Chat-bot.png',
		'project_Url':'https://github.com/ChandaniM/ChatBot',
		'project_Message':'Chat-Bot'

	},
	{
		'id':'1',
		'project_Title':'E-Commerce Web application',
		'project_Description':'A full-stack E-Commerce web application that has both the customer and seller sides where customer can buy products and seller can sell their products on the website.',
		'project_Image_alt':'This is a E-Commerce Website.',
		'project_tag':'Completed',
		'project_Image':'./Images/Ecommerce.png',
		'project_Url':'https://github.com/ChandaniM/E-commerce-Application`',
		'project_Message':'E-Commerce Website'
	},
	{
		'id':'2',
		'project_Title':'Restaurant Management System',
		'project_Description':'A full-fledged website developed using HTML,CSS,JS  for front-end and PHP for backend with MYSQL database',
		'project_Image_alt':'This is a Restaurant Management System project & here is the Restaurant Management System Images.',
		'project_tag':'Completed',
		'project_Image':'./Images/intpproect.png',
		'project_Url':'https://github.com/ChandaniM/INTP_PROJECT_17',
		'project_Message':'Restaurant Management System'
	}],
	row2:[
	{
		'id':'0',
		'project_Title':'React Gallery',
		'project_Description':'A React-gallery website developed using React. ',
		'project_Image_alt':'This is a React-gallery project.',
		'project_tag':'Working',
		'project_Image':'./Images/ReactGallery.png',
		'project_Url':'https://github.com/ChandaniM/React-Gallery',
		'project_Message':'React Gallery'
	},
		{
		'id':'1',
		'project_Title':'TODO List',
		'project_Description':'A TODO List Using React',
		'project_Image_alt':'This is a TODO List project',
		'project_tag':'Working',
		'project_Image':'./Images/TODO_List.png',
		'project_Url':'https://github.com/ChandaniM/ToDo_List',
		'project_Message':'TODO List'
	},
		{
		'id':'2',
		'project_Title':'Instagram Clone',
		'project_Description':'UI clone of the social media app Instagram developed using HTML, CSS, Javascript. Currently supported for phones.',
		'project_Image_alt':'This is a Instagram Clone project & here is the Instagram Clone Images.',
		'project_tag':'Halted',
		'project_Image':'./Images/insta-colne.png',
		'project_Url':'https://github.com/ChandaniM/Instagram-Clone',
		'project_Message':'Instagram Clone'
	}
	]
}

// export default projects;
let index=0;
for(let i in proj){
	// console.log(proj[i][index])
	for(let j=0;j<proj[i].length;j++){
		let project_card = document.getElementsByClassName("project_container");
		let div=document.createElement('div');
		div.classList.add('card','box_card');
		div.setAttribute('data-aos','fade-down');
		div.setAttribute('data-aos-duration','2000');
		// div.setAttribute('data-toggle','tooltip')
		// div.setAttribute('data-placement','right');
		div.setAttribute('title',proj[i][j].project_Message);
		let image_container=document.createElement('div');
		image_container.setAttribute('class','image_container');

		let tag_div=document.createElement('p');
		tag_div.classList.add('tags');	
		tag_div.innerHTML=proj[i][j].project_tag;
		if(proj[i][j].project_tag=="Halted"){
			tag_div.style.backgroundColor="red";
		}
		if(proj[i][j].project_tag=="Working"){
			tag_div.style.backgroundColor="#FFD700";
		}
		image_container.appendChild(tag_div);


		let image=document.createElement('img');
		image.classList.add('Image','card-img-top');
		image.setAttribute('src',proj[i][j].project_Image);
		image_container.appendChild(image);
		// div.appendChild(image);\
		div.appendChild(image_container);

		let card_detail_container=document.createElement('div');
		card_detail_container.setAttribute('class','card-body');
		let card_title=document.createElement('h5');
		card_title.setAttribute('class','card_title');
		card_title.innerHTML=proj[i][j].project_Title;
		card_detail_container.appendChild(card_title);

		let card_Description=document.createElement('p');
		card_Description.innerHTML=proj[i][j].project_Description;
		card_Description.classList.add('description');
		card_detail_container.appendChild(card_Description);

		let button_link=document.createElement('a');
		button_link.classList.add('btn','btn-primary','small-font');
		button_link.setAttribute('href',proj[i][j].project_Url);
		button_link.innerHTML="View Project";

		card_detail_container.appendChild(button_link);
		div.appendChild(card_detail_container);
		project_card[0].appendChild(div);
		// console.log(proj[i][j].Project_Title)
	}
}
