serverless backend helps us to create server such that we dont have to give a fix amount for the serveices which we pool from server but it helps to pay as per the use means we have to pay according to the per backend hits also it autoscale 

problem with this type of server
1 expensive then the normal VM server
2 cold start problem: it is little bit slow because the server is down until anyone hit the backend after so much time which create a little delay when the backend is hit first time after long time 

The famous serverless providers
1 AWS lambda
2 Google cloud function
3 Cloudflare workers

when should we have to use the serverledd architecture
1when you have to get off the ground fast and dont want to look to the deployment
2 when thier is less trafic on your site




Cloudfare worker dont use the node run time or bun also known as v8 engine 


wrangler is a CLI which is used on cloudflare

now express is not used in cloudflare and hence hono come into picture which help us to create route like get post in cloudflare
Hono is a routing libraray used to craete routing like operation like access to headers body midlewire database etc