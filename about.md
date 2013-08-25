---
layout: page
title: About me
---

{% include JB/setup %}
<link rel="stylesheet" href="/assets/themes/mark-reid/css/bootstrap.min.css" type="text/css" />
<div class="row">
<div class="col-md-4">
<img src="/images/me.jpg"/>
</div>
<div class="col-md-8">
姓项名超，生于90末，长在浙江，求学于哈工大，少时沉醉数学，后钟于物理，难料终落代码之境。初识C++，渐迷算法，敬于C的博大精深，后遇java，偏爱python，略懂Node，未来路很长。大学三年，自学无数，凡事愿深究，然所得甚少，多用github，问在stackoverflow，憾在未做TC。憧憬于酷的互联网应用，喜于做富有挑战性的项目。
</div>
</div>

    lover = ['father','mother']
    conditions = [lambda p: 'girl' in p, lambda p: 'sincere' in p,
                  lambda p: 'kind-hearted' in p, lambda p: 'smart' in p]
    confidants = [p for p in people if reduce(lambda x, y: x and y,
                                              [f(p) for f in conditions])]
    lover.append(reduce(lambda x, y: x if love_me(x) >= love_me(y) else y, confidants))
    friends = filter(lambda person: has_like-minded(person), people)
    dreams = ['To be a physicist']
    dreams.append('Write a excellent open source software')
    hopes = (travel(university) for university in world if is famous or featerd)
    if time is not busy:
        hopes.next()



    var life = function(I){
        I.wait("love",function(lover){
            efforts_for_the_dreams(lover);
            travel_around_the_world(lover);
            });
        working_hard();
        achieve_dreams();
        };

