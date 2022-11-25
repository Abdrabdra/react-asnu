const Contacts = () => {
  return (
    <div class="row">
      <div class="col-sm-6">
        <div class="embed-responsive embed-responsive-16by9">Каpта</div>
      </div>
      <div class="col-sm-6">
        <h1 class="display-4 text-center">Contacts</h1>
        <div class="list-group">
          <a
            href="tel:+77777777777"
            class="list-group-item list-group-item-action"
          >
            <i class="fa fa-phone" aria-hidden="true"></i> +7(777)-777-77-77
          </a>

          <h1 class="display-4 text-center">Write to us</h1>
          <div class="list-group">
            <div class="row">
              <div class="col-sm-6">
                <a
                  href="https://t.me/duxkz"
                  class="list-group-item list-group-item-action"
                >
                  <i class="text-info fa fa-telegram" aria-hidden="true"></i>{" "}
                  Telegram
                </a>
              </div>
              <div class="col-sm-6">
                <a
                  href="viber://chat?number=+77777777777"
                  class="list-group-item list-group-item-action"
                >
                  <img
                    style={{ width: "14px" }}
                    src="https://real-estate.zp.ua/wp-content/uploads/2018/11/viber-icon-3-278x300.png"
                  />{" "}
                  Viber
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
