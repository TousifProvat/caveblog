import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import BlogComment from '../../components/BlogComment';

const slug = () => {
  const [boxFocus, setBoxFocus] = useState<boolean>(false);

  return (
    <div className="min-h-screen flex flex-col sm:flex-row sm:justify-between">
      <div className="interaction-section hidden sm:block sm:space-y-5 sm:fixed sm:left-8 sm:top-[50%] sm:translate-y-[-50%]">
        <div className="star flex flex-col space-y-1 items-center">
          <div className="star-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-slate-500 hover:fill-yellow-400 hover:text-yellow-400 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          </div>
          <span className="text-md text-slate-400">11</span>
        </div>
        <div className="bookmark flex flex-col space-y-1 items-center">
          <div className="bookmark-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-slate-500 hover:text-blue-500 hover:fill-blue-500 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          </div>
          <span className="text-md text-slate-400">12</span>
        </div>
      </div>
      <div className="blog-container overflow-hidden space-y-3 sm:ml-12 bg-white shadow-md pb-10 rounded-b-md">
        <div className="blog-img w-full h-auto bg-gray-400"> </div>
        <div className="blog-body px-4 space-y-4">
          <div className="flex author space-x-3">
            <Link href="/tousifahmed">
              <a>
                <div className="author-img w-12 h-12 bg-gray-400 rounded-full"></div>
              </a>
            </Link>
            <div className="author-details flex flex-col justify-between">
              <Link href="/tousifahmed">
                <a>
                  <h2 className="author-name font-semibold hover:text-blue-500 cursor-pointer">
                    Tousif Ahmed
                  </h2>
                </a>
              </Link>
              <span className="text-xs text-slate-500">Posted on 31 July</span>
            </div>
          </div>
          <h2 className="title text-3xl font-bold">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et, nobis!
          </h2>
          <p className="blog-content text-lg font-light">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit omnis,
            et sint optio quidem, assumenda totam dignissimos earum aperiam esse
            itaque delectus? Error nam eaque impedit, magni quisquam vero sequi
            autem quae ea explicabo. Praesentium, consectetur. Qui natus, ipsam
            deleniti tenetur modi obcaecati corporis tempore dolor labore.
            Libero, porro. Voluptatem, quaerat voluptatum at rerum similique
            delectus? Eius, cumque. In harum a dolor nisi minus vel quaerat
            culpa molestias laudantium quas. Commodi ut necessitatibus
            consectetur tempora nihil placeat incidunt ullam non obcaecati
            aliquid possimus, assumenda, hic saepe illo reprehenderit distinctio
            aspernatur et soluta, numquam labore eius nisi. Illo facilis ut
            nostrum nesciunt animi minus est voluptas, architecto ducimus beatae
            nulla tempore corporis quas corrupti cumque dolorum, impedit
            officia? Facilis nobis rem similique recusandae itaque magni amet
            fugiat quidem eum distinctio odio, provident aliquid, voluptas
            repudiandae ab, aspernatur temporibus totam modi sit deserunt.
            Necessitatibus, nulla quaerat tempore quis, eum rem labore qui quos
            quae nemo voluptate quisquam repudiandae perferendis. Aperiam, vero
            aliquid nulla labore a modi illo delectus itaque dicta commodi
            iusto, ipsum voluptatem optio. Perferendis vitae fugit possimus
            nulla esse facere placeat veniam pariatur, molestiae, quae dolores
            magni et libero praesentium repellat. Vitae, consectetur dolore
            fugit dolorem mollitia voluptate iusto recusandae odio ullam minus
            animi soluta earum pariatur quod aut, distinctio molestias nam
            accusamus, nemo dignissimos enim voluptatibus vel odit sapiente.
            Debitis assumenda provident laborum non sapiente maiores
            necessitatibus omnis, alias, architecto ipsa voluptatibus. In fugit
            incidunt earum voluptates ipsa? Sit maiores aspernatur, quos,
            laudantium nihil recusandae ad, alias similique earum quisquam
            numquam minus eum optio deserunt placeat rerum? Similique eius
            laudantium praesentium quasi ipsam maxime aliquid aliquam mollitia
            nam rem porro consequatur odio, asperiores voluptates quod? Sed
            asperiores eum tempore perferendis eligendi modi sint nemo incidunt
            aperiam repudiandae cupiditate assumenda, iusto reprehenderit
            accusantium illo commodi ex expedita et, deleniti fuga tempora,
            libero nostrum aut deserunt. Necessitatibus, nostrum suscipit eos
            magnam placeat voluptatum? Similique voluptate nemo libero quibusdam
            aliquid. Rem eos earum, laborum culpa expedita illum molestiae iste
            impedit, illo accusamus suscipit commodi cumque dolorum, laboriosam
            numquam. Libero facere excepturi ab culpa ipsum eum, itaque, quis
            veritatis perspiciatis deleniti nemo impedit sapiente, quas nostrum.
            Blanditiis voluptatibus quisquam eaque dolore amet ut tempora fuga
            ea deserunt. Error enim iure facilis quibusdam architecto facere
            explicabo dolor consequuntur voluptates? Iusto officia, maiores
            voluptates doloremque id quis esse repellat quasi dignissimos magni.
            Ullam cumque temporibus amet molestias eligendi nesciunt! Laboriosam
            perspiciatis veritatis sapiente ipsum reprehenderit! Fuga nisi
            inventore officia, magnam animi mollitia a excepturi molestiae
            nostrum consequuntur eaque, quaerat similique beatae provident ad
            quam hic, aliquam nobis. Assumenda explicabo dolorem fugiat ipsam
            ipsa est porro similique recusandae quisquam qui. Similique labore
            doloremque laborum iusto saepe distinctio in perferendis sunt,
            assumenda quibusdam quo natus nobis. Fugit incidunt non molestias ab
            a ullam nam maiores vel, vitae, delectus expedita aliquam totam,
            reiciendis natus placeat ratione aliquid. Nemo impedit quaerat,
            maiores architecto sunt illo! Libero, ea sunt placeat commodi
            pariatur quas possimus dolorem quia eligendi ratione corporis
            veritatis nulla modi aliquam? Explicabo adipisci eveniet voluptatum
            tempora consequatur. Modi aliquid consequatur dignissimos, dolor
            alias animi laboriosam commodi quae earum vel repellendus. Totam
            inventore porro corporis distinctio ex rem, harum quae in animi
            quisquam explicabo accusamus similique ipsum dolores blanditiis
            magni voluptas! Hic quis, blanditiis sed repudiandae eveniet sequi
            reprehenderit nemo, quidem soluta accusamus dolorum officia
            dignissimos, dolores ad corrupti nam iusto tempora illo illum
            nesciunt veritatis harum veniam. Enim voluptates ipsam molestiae
            debitis rerum ipsa, illo, quia rem provident, non est fugiat.
            Expedita amet corporis repellat perferendis nulla assumenda
            consectetur. Eligendi cum distinctio tempora dicta odit laboriosam,
            quam accusantium commodi, ea ipsa corrupti sequi earum doloribus?
            Sunt laboriosam molestias officia quisquam veritatis a libero
            consequuntur quia accusamus, cupiditate consectetur harum. Suscipit
            impedit distinctio voluptate molestias quam. Dignissimos
            perspiciatis id porro ut, quia odit quibusdam! Enim soluta iste
            eveniet! Voluptatem rem iusto laudantium, ad, aut ipsum voluptatum
            assumenda facere labore perferendis, blanditiis obcaecati? Optio
            autem aperiam dicta facilis, sint itaque at debitis cupiditate
            voluptatem doloribus? Natus mollitia quaerat magni dignissimos sequi
            commodi blanditiis culpa omnis ea modi nobis ullam, voluptate
            inventore quod unde cumque doloribus nam architecto debitis
            assumenda! Quod nostrum at voluptatibus quae voluptate earum iste
            tenetur accusantium explicabo, atque laudantium, autem ex. Magni
            porro nam sequi sit maxime illo totam perferendis debitis, quo in
            similique, molestias earum harum neque sint dolore. Aliquid quia
            saepe totam officia ex similique odit commodi quae praesentium
            aliquam voluptatum asperiores blanditiis voluptates tempora ad, quod
            consequuntur molestiae adipisci tempore corporis laboriosam placeat
            repellendus. Ratione animi, voluptatem provident distinctio
            obcaecati quisquam adipisci reiciendis fugit excepturi nostrum rem
            ipsam ex ad quod hic error sed deserunt facilis unde. Eaque laborum
            vitae voluptate non quisquam facere, debitis aut, provident aliquam
            accusantium quod nisi? Deleniti debitis eligendi sint incidunt
            dolorum rerum explicabo similique inventore cumque quidem voluptates
            officia vitae quod unde magni excepturi, error nulla. Optio natus
            itaque cumque accusamus, eum quos ipsam aperiam quis aspernatur odit
            nam quam perferendis illo debitis mollitia impedit aut distinctio.
            Aspernatur, unde. Porro nulla nesciunt quis iste aut culpa magni
            neque fugit veniam id perferendis, accusantium explicabo sint
            ducimus sequi excepturi perspiciatis consequuntur officia voluptatem
            tenetur at similique. Commodi esse nam et repellendus veritatis
            eaque nulla voluptate non nobis. Labore et architecto officiis
            reprehenderit laboriosam illo eligendi nemo accusantium ipsam
            delectus eos, corporis dolore accusamus distinctio, nostrum
            similique mollitia. At beatae ratione maxime, et odit, quo tempora
            quos in ut incidunt ad ullam quasi reprehenderit dolorum deserunt
            asperiores esse provident laborum aliquid est perspiciatis molestias
            eius obcaecati sequi. Nulla eum amet, aliquid blanditiis cum aperiam
            vero repellat eveniet totam libero aut itaque quasi dicta architecto
            aspernatur iste sit reiciendis tempore iure ipsum velit vitae sed
            accusamus molestiae? Quis eaque explicabo obcaecati amet soluta?
            Beatae dolore ab odit quod eligendi nihil maiores eos dignissimos
            soluta delectus deserunt laboriosam amet harum, earum, accusamus
            alias totam in cum voluptatibus fuga, deleniti repudiandae? Eum,
            dicta maiores. Voluptatum labore eligendi voluptate, fuga voluptates
            minima officia odit nihil delectus et provident, nisi molestiae,
            accusamus sapiente repellat atque laborum. Cum non ex nulla dolorum
            reprehenderit ipsa quis culpa!
          </p>
        </div>
        <div className="w-full interaction-section-small space-x-5 flex items-center justify-center pt-5 pb-10 sm:hidden">
          <div className="star flex space-x-1 items-center">
            <div className="star-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-slate-500 hover:fill-yellow-400 hover:text-yellow-400 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            </div>
            <span className="text-md text-slate-400">11</span>
          </div>
          <div className="bookmark flex space-x-1 items-center">
            <div className="bookmark-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-slate-500 hover:text-blue-500 hover:fill-blue-500 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </div>
            <span className="text-md text-slate-400">12</span>
          </div>
        </div>
        <div className="discussion px-4 space-y-6">
          <h2 className="section-title text-xl font-bold">Discussion (20)</h2>
          <div className="add-comment-section flex flex-col space-y-2">
            <div className="comment-box flex space-x-2">
              <div className="profile-avatar w-10 h-10 bg-gray-300 rounded-full"></div>
              <textarea
                placeholder="Add Comment..."
                className={`comment-box w-[90%] h-${
                  boxFocus ? '36' : '20'
                } border-[1px] rounded-md border-gray-300 outline-none focus:border-blue-500 px-2 py-1 placeholder:font-light`}
                onFocus={() => setBoxFocus(true)}
              ></textarea>
            </div>
            {boxFocus && (
              <button
                className="comment-submit-button px-4 py-2 bg-blue-400 hover:bg-blue-500 rounded-md w-20 ml-[3rem] text-white"
                type="submit"
              >
                Submit
              </button>
            )}
          </div>
          <div className="comment-container flex flex-col space-y-2">
            <BlogComment />
            <BlogComment />
            <BlogComment />
          </div>
        </div>
      </div>
    </div>
  );
};

export default slug;
