function shuffle(array) {
    let currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }

    return array;
}

$('[data-action="hide-section"]').on("click", function () {
    //alternative: use bootstrap "collapse".
    //Reason I didn't use: Ability to change button text to "Show" / "Hide"
    const target = $(this).data("target");

    const $target = $("#" + target);

    const $isHidden = $target.data("hidden") ? true : false;

    if ($isHidden) {
        $(this).text("Hide");
        $target.css({ display: "block" });
        $target.data("hidden", null);
    } else {
        $(this).text("Show");
        $target.css({ display: "none" });
        $target.data("hidden", true);
    }
});

$(".card-img-top").on("click", function () {
    $(this).parent().find(".card-body").toggle();
});

$(function () {
    //when DOM ready
    $("body").scrollspy({ target: "#epicode-navbar" });
    //shuffle tapestry

    let eles = [];

    $(".tapestry > div").each((i, ele) => {
        eles.push(ele);
        ele.remove();
    });
    shuffle(eles);
    for (const ele of eles) {
        $(".tapestry").append(ele);
    }
    //take existing divs, shuffle, and reappend

    //get album count
    const $albums = $(".card");

    $("#albums-count").text($albums.length);

    $(".fade-in-on-load").addClass("fade-in");
});

const RemoveRowButtons = document.querySelectorAll(
    '[data-action="remove-row"]'
);

for (const button of RemoveRowButtons) {
    button.addEventListener("click", function (e) {
        const target = e.currentTarget;
        const col = target.parentNode;
        const row = col.parentNode;

        row.remove();
    });
}

const addTableRow = (table, cols = []) => {
    const $tbody = table.find("tbody");

    const $tr = $("<tr>");

    for (const col of cols) {
        const $td = $("<td>");
        $td.text(col);

        $tr.append($td);
    }

    $tbody.append($tr);
};

const addTrackButton = document.querySelector("#add-track");

addTrackButton.addEventListener("click", function (e) {
    e.preventDefault();

    let trackNumber, trackTitle, trackDuration, artist;

    const trackNumberField = document.querySelector("#track-number");
    const trackTitleField = document.querySelector("#track-title");
    const trackDurationField = document.querySelector("#track-duration");
    const artistField = document.querySelector("#artist-name");

    trackNumber = trackNumberField.value;
    trackTitle = trackTitleField.value;
    trackDuration = trackDurationField.value;
    artist = artistField.value;

    addTableRow($("#tracklist-section table"), [
        trackNumber,
        trackTitle,
        artist,
        trackDuration,
    ]);

    console.log(trackNumber, trackTitle, artist, trackDuration);

    alert("Added " + trackTitle + " to tracklist");
});
