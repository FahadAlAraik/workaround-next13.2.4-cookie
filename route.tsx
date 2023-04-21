import * as jose from 'jose'

export async function POST(req:Request,res:NextApiResponse) {

    const alg = "HS256" // algorithm in header
    const secret = new TextEncoder().encode(process.env.JWT_secret)
    const token = await new jose.SignJWT({'email':'test@gmail.com'})
                                 .setProtectedHeader({alg})
                                 .setExpirationTime('24h')
                                 .sign(secret)
                                 
    const respo = new NextResponse()
    respo.cookies.set('jwt',token)
    return NextResponse.json({user},{headers:respo.headers})
