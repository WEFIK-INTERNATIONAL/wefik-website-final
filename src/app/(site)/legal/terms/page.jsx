import React from "react";
import HeadingText from "@/components/ui/HeadingText";

function page() {
  return (
    <section className="pt-44">
      <div className="">
        <div className="px-5">
          <HeadingText>Terms & Conditions</HeadingText>
        </div>
        <div className="mt-24 px-5 pb-10 text-lg text-white/60 lg:flex lg:justify-between">
          <div className="hidden text-white lg:flex">
            <p>Terms & Conditions</p>
          </div>
          <div className="lg:max-w-6xl lg:px-20">
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl font-medium text-white">
                Terms & Conditions
              </h2>
              <p>Last updated on 1 September 2025</p>
              <p className="mb-8">
                By accessing this website, operated by{" "}
                <span className="font-medium">WEFIK INTERNATIONAL LTD</span>,
                you are agreeing to be bound by these Website Terms and
                Conditions of Use and agree that you are responsible for
                compliance with any applicable local laws. If you disagree with
                any of these terms, you are prohibited from accessing this site.
                The materials contained in this Website are protected by
                copyright and trademark law.
              </p>
            </div>
            <div className="mb-12">
              <h2 className="mb-4 text-xl font-medium text-white md:text-2xl">
                1. Use License
              </h2>
              <p className="mb-4">
                Permission is granted to temporarily download one copy of the
                materials on WEFIK INTERNATIONAL LTD&apos;s Website for personal,
                non-commercial transitory viewing only. This is the grant of a
                license, not a transfer of title, and under this license you may
                not:
              </p>
              <ul className="mb-4 list-inside list-disc space-y-2">
                <li>Modify or copy the materials.</li>
                <li>
                  Use the materials for any commercial purpose or for any public
                  display.
                </li>
                <li>
                  Attempt to reverse engineer any software contained on WEFIK
                  INTERNATIONAL LTD&apos;s Website.
                </li>
                <li>
                  Remove any copyright or other proprietary notations from the
                  materials.
                </li>
                <li>
                  Transfer the materials to another person or &quot;mirror&quot; the
                  materials on any other server.
                </li>
              </ul>
              <p>
                This license shall automatically terminate if you violate any of
                these restrictions and may be terminated by WEFIK INTERNATIONAL
                LTD at any time. Upon termination, your viewing right will also
                be terminated and you must destroy any downloaded materials in
                your possession whether in electronic or printed format.
              </p>
            </div>
            <div className="mb-12">
              <h2 className="mb-4 text-xl font-medium text-white md:text-2xl">
                2. Disclaimer
              </h2>
              <p>
                All the materials on WEFIK INTERNATIONAL LTD&apos;s Website are
                provided &quot;as is&quot;. WEFIK INTERNATIONAL LTD makes no warranties,
                may it be expressed or implied, and hereby negates all other
                warranties. Furthermore, WEFIK INTERNATIONAL LTD does not make
                any representations concerning the accuracy or reliability of
                the use of the materials on its Website or otherwise relating to
                such materials or any sites linked to this Website.
              </p>
            </div>
            <div className="mb-12">
              <h2 className="mb-4 text-xl font-medium text-white md:text-2xl">
                3. Limitations
              </h2>
              <p>
                WEFIK INTERNATIONAL LTD or its suppliers will not be held
                accountable for any damages that will arise with the use or
                inability to use the materials on WEFIK INTERNATIONAL LTD&apos;s
                Website, even if WEFIK INTERNATIONAL LTD or an authorized
                representative has been notified of the possibility of such
                damage. Some jurisdictions do not allow limitations on implied
                warranties or limitations of liability for incidental damages,
                so these limitations may not apply to you.
              </p>
            </div>
            <div className="mb-12">
              <h2 className="mb-4 text-xl font-medium text-white md:text-2xl">
                4. Revisions and Errata
              </h2>
              <p>
                The materials appearing on WEFIK INTERNATIONAL LTD&apos;s Website may
                include technical, typographical, or photographic errors. WEFIK
                INTERNATIONAL LTD does not warrant that any of the materials on
                its Website are accurate, complete, or current. WEFIK
                INTERNATIONAL LTD may make changes to the materials contained on
                its Website at any time without notice but does not make any
                commitment to update them.
              </p>
            </div>
            <div className="mb-12">
              <h2 className="mb-4 text-xl font-medium text-white md:text-2xl">
                5. Links
              </h2>
              <p>
                WEFIK INTERNATIONAL LTD has not reviewed all of the sites linked
                to its Website and is not responsible for the contents of any
                such linked site. The inclusion of any link does not imply
                endorsement by WEFIK INTERNATIONAL LTD of the site. Use of any
                linked website is at the user&apos;s own risk.
              </p>
            </div>
            <div className="mb-12">
              <h2 className="mb-4 text-xl font-medium text-white md:text-2xl">
                6. Site Terms of Use Modifications
              </h2>
              <p>
                WEFIK INTERNATIONAL LTD may revise these Terms of Use for its
                Website at any time without prior notice. By using this Website,
                you are agreeing to be bound by the then-current version of
                these Terms and Conditions of Use.
              </p>
            </div>
            <div className="mb-12">
              <h2 className="mb-4 text-xl font-medium text-white md:text-2xl">
                7. Your Privacy
              </h2>
              <p>
                Please read our{" "}
                <a
                  href="/legal/privacy-policy"
                  className="font-medium text-white underline"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </div>
            <div>
              <h2 className="mb-4 text-xl font-medium text-white md:text-2xl">
                8. Governing Law
              </h2>
              <p>
                Any claim related to WEFIK INTERNATIONAL LTD&apos;s Website shall be
                governed by the laws of India, without regard to its conflict of
                law provisions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default page;
