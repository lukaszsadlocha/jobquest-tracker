# Job Quest Tracker

## Background
I was looking for a new job and I participated in many recruitment processes. Keeping notes regarding the role and all details started to be a challange. I used simple txt file but it started to be longer and longer and my convention of writing the most important information begun to be unmanagable 

## Business idea
Write an app to keep track of all recrutment process

## Tech idea
Levrage the AI app to generate design and try to reuse it in the React on Front-End
Check how ChatGPT can help me with writing .NET code

## Extra:
There will be a chrome plugin that can scrap DM from LinkedId


# TODO - plan
- [x] Setup FrontEnd (React & MaterialUI)
- [x] Setup dummy Api
- [x] Frontend on https
- [x] Setup dev & prod variables for both Dev and Prod (cros etc)
- [x] Setup deployment to Azure
- [x] Add Evens to models
- [ ] * Add Form to add/edit/view Recruitment Process & Events
      (Make nice view forms (text field disabled)?
      (improve edit froms (get correct inputs for dropdown)
      (reload table data after all actions - including adding new Process)
      (add button to add event for exising process)
      (fix buttons positions and style on each form)
      (make each form of the same size)
      (Make table header bolded)
      (add apis for edit/delete events)
    
- [ ] Prepare Mappings for dropdowns (nice names with spaces)
- [ ] Add Google Auth
- [ ] Add Persistent storage (CosmosDB, AzureSQL, Redis?)
- [ ] Conditional formatting to pritify the table

# TODO - backlog
- [ ] Drag and drop attachement & save it to blob or document DB
- [ ] Add Recrutiment Cycle (and group Recruitment processes)
- [ ] (consider) Split Company and R.Process


## Tricks & Things to remember
- To run local React Frontend: `set HTTPS=true&&npm start`
- Azure always free services https://azure.microsoft.com/en-us/pricing/free-services/
