
import { subtitle, title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";



export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">

        <div className="inline-block max-w-lg text-center justify-center">
          <div className={subtitle({ class: "mt-4 ju"})}>
            Hello Wolrd 👋🏾
          </div>
          <span className= {title()}>Me chamo Felipe&nbsp;</span>
          <span className={title({ color: "blue" })}>Alves,&nbsp;</span>
          <br />
          
          <div className={subtitle({ class: "mt-4" })}>
            Desenvolvedor Web front-end.
          </div>
        </div>

        <div className="inline-block max-w-lg text-center justify-center">
        
        </div>
        
      </section>
    </DefaultLayout>
  );
}
