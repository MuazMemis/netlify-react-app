# react-deploy

## Surge

[Basic index](https://bumpy-pleasure.surge.sh)

[React app](https://impossible-act.surge.sh)

```sh
npm install --global surge
yarn build
cd build
surge
```

## Netlify

[React app](https://patika-react-app.netlify.app)

- Site settings -> Build & deploy -> Build Settings -> Edit settings -> Build Command: yarn test && yarn build
- Deploys -> Build Settings -> Edit settings -> Build Command: yarn test && yarn build
- Site settings -> Change site name
- Site settings -> Environment variables -> Add variable -> Add a single variable or import from a .env file
- Deploys -> Trigger deploy -> Deploy site
- [Refresh 404 not found => create public/\_redirects](https://patika-react-app.netlify.app/about)
- [![Netlify Status](https://api.netlify.com/api/v1/badges/6a854854-fa53-4889-85fe-f993fcfb5601/deploy-status)](https://app.netlify.com/sites/patika-react-app/deploys)

## AWS

[Amazon EC2 not https](http://13.53.194.40)

### Create instance

- Allow Http | https

```sh
chmod 400 react-app.pem
ssh -i react-app.pem ubuntu@13.53.194.40
ssh -i react-app.pem ubuntu@13.50.249.190
sudo apt-get install -f
curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash - &&\ sudo apt-get install -y nodejs
node -v
npm -v
git clone https://github.com/MuazMemis/react-deploy.git
cd react-deploy
sudo su # su ubuntu => for change ubuntu
npm i -g yarn
yarn
vi .env # REACT_APP_ENDPOINT=https://jsonplaceholder.typicode.com
yarn build
apt-get install nginx -y
chown -R $USER:$GROUP ~/.npm # yarn çalışmazsa... "EACCES: permission denied, open '/home/ubuntu/.config/yarn'"
chown -R $USER:$GROUP ~/.config
vi /etc/nginx/sites-available/default
nginx -t
service nginx reload
```

[Amazon EC2 Github Action auto deploy](http://13.53.194.40)

- Github repo -> settings -> actions -> runner

```sh
    # Create a folder
    mkdir actions-runner && cd actions-runner# Download the latest runner package
    curl -o actions-runner-linux-x64-2.303.0.tar.gz -L https://github.com/actions/runner/releases/download/v2.303.0/actions-runner-linux-x64-2.303.0.tar.gz# Optional: Validate the hash
    echo "e4a9fb7269c1a156eb5d5369232d0cd62e06bec2fd2b321600e85ac914a9cc73  actions-runner-linux-x64-2.303.0.tar.gz" | shasum -a 256 -c# Extract the installer
    tar xzf ./actions-runner-linux-x64-2.303.0.tar.gz

    # Create the runner and start the configuration experience
    ./config.sh --url https://github.com/MuazMemis/react-deploy --token AOWL636SOIGQY7YF5LVYDKDEDVB66# Last step, run it!
    ./run.sh

    sudo ./svc.sh install
    sudo ./svc.sh start

    # Use this YAML in your workflow file for each job
    runs-on: self-hosted
```

- Github repo -> actions -> nodejs configure

```sh
chmod 400 react-app.pem
ssh -i react-app.pem ubuntu@13.50.249.190
sudo vi /etc/nginx/sites-available/default
nginx -t
service nginx reload # sudo service nginx restart
sudo chmod +x home/
sudo chmod +x home/ubuntu
sudo chmod +x home/ubuntu
sudo chmod +x home/ubuntu/actions-runner
sudo chmod +x home/ubuntu/actions-runner/react-deploy
sudo chmod +x home/ubuntu/actions-runner/react-deploy/react-deploy
sudo chmod +x home/ubuntu/actions-runner/react-deploy/react-deploy/build
```

[Amazon S3 buckets - Github Action auto deploy](http://react-example2.s3-website-us-west-1.amazonaws.com)

- Permissions overview -> Block public access (bucket settings) -> public
- Permissions overview -> bucket policy => deploy-not/aws/S3/bucket-policy
- Permissions overview -> Access control list (ACL) -> Everyone (public access): read
- Edit static website hosting -> Static website hosting: enable -> Host a static website -> Index document: index.html and error document: index.html

```sh
sudo snap install aws-cli --classic
sudo apt install awscli
mkdir ~/.aws
sudo vi credentials
# [default]
# aws_access_key_id=acces_key
# aws_secret_access_key=secret_access_key
# or
aws configure
# AWS Access Key ID [****************IKVY]: Access Key ID
# AWS Secret Access Key [****************X5nN]: Secret Access Key
# Default region name [None]: us-west-1
# Default output format [None]: json
aws configure list
aws s3 sync build/ s3://bucket-name
#***********
```
