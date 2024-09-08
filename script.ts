document.getElementById("resumeform")?.addEventListener("submit", function(event){
    event.preventDefault();

    const profilePictureInput =document.getElementById("profilePicture") as HTMLInputElement;
    const nameElement=document.getElementById("name") as HTMLInputElement;
    const emailElement=document.getElementById("email") as HTMLInputElement;
    const phoneElement=document.getElementById("phone") as HTMLInputElement;

    const educationElement=document.getElementById("education") as HTMLTextAreaElement;
    const experienceElement=document.getElementById("experience") as HTMLTextAreaElement;
    const skillsElement=document.getElementById("skills") as HTMLTextAreaElement;

// Changing:
    const usernameElement = document.getElementById(
        "username"
    )as HTMLInputElement;

if (profilePictureInput &&
    nameElement &&
     emailElement &&
     phoneElement&&
      educationElement &&
      experienceElement && 
      skillsElement &&
      usernameElement
      
) 
{
    const name = nameElement.value;
    const email = emailElement.value;
    const phone =phoneElement.value;
    const education =educationElement.value;
    const experience=experienceElement.value;
    const skills=skillsElement.value;

    //Profile Picture
    const profilePictureFile = profilePictureInput.files?.[0]
    const profilePictureURL =  profilePictureFile ?URL.createObjectURL(profilePictureFile):'';


// Changing:
const username = usernameElement.value;
const uniquepath = `${username.replace(/\s+/g, '')}_cv.html`;

    const resumeOutput = `
    <h2>Your Resume </h2>
    ${profilePictureURL? `<img src="${profilePictureURL}" alt ="profile Picture"  class="profilePicture">`: ""}
    <p><strong>Name:</strong><span id="edit-name" class="editable"> ${name}</span></p>
    <p><strong>email:</strong><span id="edit-email" class="editable"> ${email}</span></p>
    <p><strong>phone:</strong><span id="edit-phone" class="editable"> ${phone}</span></p>

    <h3>Education</h3>
    <p id="edit-education" class="editable">${education}</p>
    
    <h3>Experience</h3>
    <p id="edit-experience" class="editable">${experience}</p>
    
    <h3>Skills</h3>
    <p id="edit-skills" class="editable">${skills}</p>
    `;
    // changing:
    const downloadlink = document.createElement('a')
    downloadlink.href = 'data:text/html;charset=UTF-8,' + encodeURIComponent(resumeOutput);
    downloadlink.download = uniquepath
    downloadlink.textContent = 'Download Your Resume';


// ResumeOutput:
    const resumeOutputElement = document.getElementById("resumeOutput")
    if(resumeOutputElement){
        resumeOutputElement.innerHTML = resumeOutput;
    
    // Changing:
    resumeOutputElement?.appendChild(downloadlink)

   resumeOutputElement.style.display ='block';
    }
 else{
        console.log("one or more form elements are missing or empty" );
    }
}});

function makeEditTable(){
    const editableElements = document.querySelectorAll(".editable");
    editableElements.forEach(element =>{
        element.addEventListener("click" , function(){
            const currentElement = element as HTMLElement
            const currentValue= currentElement.textContent || "";

            // Replace:
            if(currentElement.tagName === "p" || currentElement.tagName === "SPAN"){
                const Input = document.createElement("Input") as HTMLInputElement
                Input.type = 'text'
                Input.value = currentValue
                Input.classList.add("editing Input")

                Input.addEventListener('blur', function(){
                    currentElement.textContent = Input.value;
                    currentElement.style.display = 'inline'
                    Input.remove()
                })
                currentElement.style.display = 'none'
                currentElement.parentNode?.insertBefore(Input , currentElement)
                Input.focus()

            }
        })
    })
}