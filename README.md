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

[Amazon EC2](https://13.53.194.40)

### Create instance

- Allow Http | https

```sh
chmod 400 react-app.pem
ssh -i react-app.pem ubuntu@13.53.194.40
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
