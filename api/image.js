export default async function handler(req,res){

const {prompt}=req.body;

const r=await fetch("https://api.replicate.com/v1/predictions",{
method:"POST",
headers:{
"Authorization":"Token "+process.env.REPLICATE_API_KEY,
"Content-Type":"application/json"
},
body:JSON.stringify({
version:"39ed52f2a78e934bfaec84f9c2223af4d6c0d8bbed7c1816a9cdae361d556feb",
input:{
prompt,
width:768,
height:768
}
})
});

const d=await r.json();

const result=await fetch(
`https://api.replicate.com/v1/predictions/${d.id}`,
{
headers:{
"Authorization":"Token "+process.env.REPLICATE_API_KEY
}
}
);

const final=await result.json();

res.json({
image:final.output?.[0] || null
});

}
