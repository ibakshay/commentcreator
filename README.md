# greet-contributors-action

> Github Action to greet all the wonderful contributors within a Pull Request. 

As it is important to acknowledge and give credit to all the contributors  who has dedicated their time and effort and So, you can use this action to  post a  Pull Request Comment greeting all the contributors like below. 

<br/>

<img width="765" alt="Screenshot 2019-12-30 at 18 22 06" src="https://user-images.githubusercontent.com/33329946/71592779-d8dd6000-2b31-11ea-9337-28b9ab7cd59d.png">

# Usage 

Create .github/workflows/greet-contributors.yml file and add the below workflow. That is all it is required to greet your contributors within the pull request. 

``` yml

name: "GreetContributor"
on:
  pull_request:
    types: [opened,synchronize]
    
jobs:
  GreetCommitter:
      
    runs-on: ubuntu-latest
    steps:
    - name: "Greet contributor"
      uses: ibakshay/greet-contributors-action@master
      env: 
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

```
