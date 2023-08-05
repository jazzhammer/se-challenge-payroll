import Image from 'next/image'
import logo from '/public/assets/image/wavepay.png'
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div>
        wavepay
      </div>
      <div>
        <Image src={logo} alt={'wavepay logo'} width={20} height={20} className="logo"/>
      </div>
    </main>
  )
}
