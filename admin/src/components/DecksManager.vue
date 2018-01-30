<template>
    <div class="decks">
        <h1>{{ msg }}</h1>

        <main role="main">
            <!--<section class="jumbotron text-center">
                <div class="container">
                    <h1 class="jumbotron-heading">Album example</h1>
                    <p class="lead text-muted">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don't simply skip over it entirely.</p>
                    <p>
                        <a href="#" class="btn btn-primary my-2">Main call to action</a>
                        <a href="#" class="btn btn-secondary my-2">Secondary action</a>
                    </p>
                </div>
            </section>-->

            <div class="album py-5 bg-light">
                <div class="container">
                    <figure class="figure">
                        <img class="img-fluid img-thumbnail" src="http://placehold.it/150x200" alt="Card image cap">
                        <p><button class="btn">CENAS</button></p>
                    </figure>
                    
                    <div class="row">
                        <div class="col-3 w-150 h-200">
                            <img class="img-fluid img-thumbnail" src="http://placehold.it/150x200" alt="Card image cap">
                        </div>
                        <div class="col-3 w-150 h-200">
                            <img class="img-fluid img-thumbnail" src="http://placehold.it/150x200" alt="Card image cap">
                        </div>
                        <div class="col-3 w-150 h-200">
                            <img class="img-fluid img-thumbnail" src="http://placehold.it/150x200" alt="Card image cap">
                        </div>
                        <div class="col-3 w-150 h-200">
                            <img class="img-fluid img-thumbnail" src="http://placehold.it/150x200" alt="Card image cap">
                        </div>
                        <div class="col-3 w-150 h-200">
                            <img class="img-fluid img-thumbnail" src="http://placehold.it/150x200" alt="Card image cap">
                        </div>
                    </div>
                </div><!-- END CONTAINER DIV-->
            </div><!-- END ALBUM DIV-->
        </main><!-- END MAIN -->
    </div>
</template>

<script>
export default {
    name: 'Decks',
    data () {
        return {
            msg: 'Decks page'
        }
    }
}
</script>

<style scoped>
:root {
  --jumbotron-padding-y: 3rem;
}

.jumbotron {
  padding-top: var(--jumbotron-padding-y);
  padding-bottom: var(--jumbotron-padding-y);
  margin-bottom: 0;
  background-color: #fff;
}
@media (min-width: 768px) {
  .jumbotron {
    padding-top: calc(var(--jumbotron-padding-y) * 2);
    padding-bottom: calc(var(--jumbotron-padding-y) * 2);
  }
}

.jumbotron p:last-child {
  margin-bottom: 0;
}

.jumbotron-heading {
  font-weight: 300;
}

.jumbotron .container {
  max-width: 40rem;
}

.box-shadow { box-shadow: 0 .25rem .75rem rgba(0, 0, 0, .05); }
</style>