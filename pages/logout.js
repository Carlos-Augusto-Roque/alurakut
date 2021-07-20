import nookies from 'nookies';

export default function Logout() {
    return ""
}

//função para logout usando nookies destroy
export async function getServerSideProps(context) {
    await nookies.destroy(context, 'USER_TOKEN')
    return {
        redirect: {
          destination: '/login',
          permanent: false,
        }
      }
}
