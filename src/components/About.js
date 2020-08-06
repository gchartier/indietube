import React from "react";
import styled from "styled-components";

const StyledAbout = styled.aside`
    text-align: left;
    background-color: #ffce80;
`;

const H1 = styled.h1`
    font-size: 2rem;
`;

function About() {
    return (
        <StyledAbout>
            <H1>What is indieTube?</H1>
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa
                accusantium eaque, vitae perspiciatis, eum, veritatis eius esse
                dolor praesentium ullam qui possimus velit iusto consectetur
                illum doloribus ducimus? Incidunt asperiores impedit ipsam sit.
                Iusto, aut! Accusamus veniam voluptate aliquid nam, sed minima
                dolor debitis maiores at hic explicabo eaque iusto magnam
                repellendus earum consectetur, tenetur itaque error, vitae
                nesciunt quo! Dicta aut consectetur dignissimos nulla numquam id
                eaque, doloremque debitis sed corrupti pariatur reprehenderit
                commodi ea mollitia nisi dolorem nostrum voluptatum iure quia
                exercitationem earum quaerat expedita officiis! Enim, rerum
                architecto. Atque magnam impedit fuga sed nam aspernatur
                adipisci numquam?
            </p>
        </StyledAbout>
    );
}

export default About;
