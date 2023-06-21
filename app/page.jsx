import  Feed from '@components/Feed';
const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
          Discover and Share{' '}
          <br className="max-md:hidden"/>
          <span className="green_gradient text-center">AI-Powered Ideas</span>
        </h1>
        <p className=" desc text-center">IdeaScape is an open-source AI tool for modern world to discover, create, and share creative ideas.</p>
    <Feed/>
    </section>
  )
}
//test
export default Home