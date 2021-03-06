// Put scripts here to interact with API

// Interact with API endpoint /contact.html/app/user/create/ to log a new user
const submitUser = document.getElementById("contactForm")
			// Add event listener for submission of form
			submitUser.addEventListener("submit", submitForm)
			// Create the submit handler
			async function submitForm(event) {
				event.preventDefault();
				
				const endpoint = "/app/user/create/"
				const url = document.baseURI+endpoint

				const formEvent = event.currentTarget

				try {
					const formData = new FormData(formEvent);
                    console.log(formData)
					const response = await sendContact({ url, formData });
                    
					console.log(response);
                    location.reload();
				} catch (error) {
					console.log(error);
				}
			}
			// Create a data sender
			async function sendContact({ url, formData }) {
				const plainFormData = Object.fromEntries(formData.entries());
				const formDataJson = JSON.stringify(plainFormData);
				console.log(formDataJson);

				const options = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json"
					},
					body: formDataJson
				};

				const response = await fetch(url, options);
				return response.json()
			}