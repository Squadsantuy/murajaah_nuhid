// Data Dzikir Pagi dan Petang
// Waktu: Setelah sholat Subuh sampai terbit matahari (Pagi) / Setelah Ashar sampai Maghrib (Petang)

export interface DzikirItem {
    id: number;
    title: string;
    arabic: string;
    translation: string;
    faedah: string;
    count: number;
    time: 'pagi' | 'petang' | 'both';
    note?: string;
}

export interface DzikirData {
    type: 'pagi' | 'petang';
    title: string;
    description: string;
    time: string;
    items: DzikirItem[];
}

// ========== DZIKIR PAGI (22 ITEM) ==========

const DZIKIR_PAGI_ITEMS: DzikirItem[] = [
    {
        id: 1,
        title: 'Ayat Kursi',
        arabic: 'اَللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ وَلَا يَئُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ',
        translation: 'Allah, tidak ada Ilah (yang berhak diibadahi dengan benar) melainkan Dia. Yang Hidup kekal lagi terus menerus mengurus (makhluk-Nya); tidak mengantuk dan tidak tidur. Kepunyaan-Nya apa-apa yang ada di langit dan apa-apa yang ada di bumi. Siapakah yang dapat memberi syafa\'at di sisi Allah tanpa izin-Nya. Allah mengetahui apa-apa yang di hadapan mereka dan di belakang mereka, dan mereka tidak mengetahui apa-apa dari ilmu Allah melainkan apa yang dikehendaki-Nya. Dan Kursi Allah meliputi langit dan bumi, dan Allah tidak merasa berat memelihara keduanya, dan Allah Maha Tinggi lagi Maha Besar.',
        faedah: 'Barangsiapa yang membaca ayat ini ketika pagi hari, maka ia dilindungi dari (gangguan) jin hingga sore hari. (HR. Al-Hakim, Shahih At-Targhiib wat Tarhiib)',
        count: 1,
        time: 'both'
    },
    {
        id: 2,
        title: 'Surat Al-Ikhlas',
        arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
        translation: 'Katakanlah: Dia-lah Allah Yang Maha Esa. Allah adalah Tuhan yang bergantung kepada-Nya segala sesuatu. Dia tidak beranak dan tidak pula diperanakkan, dan tidak ada seorang pun yang setara dengan Dia.',
        faedah: 'Barangsiapa membaca tiga surat (Al-Ikhlas, Al-Falaq, An-Naas) setiap pagi dan sore hari, maka cukup baginya dari segala sesuatu. (HR. Abu Dawud, An-Nasa-i, Tirmidzi - Hasan Shahih)',
        count: 3,
        time: 'both'
    },
    {
        id: 3,
        title: 'Surat Al-Falaq',
        arabic: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِن شَرِّ مَا خَلَقَ ۝ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ',
        translation: 'Katakanlah: Aku berlindung kepada Tuhan Yang Menguasai subuh, dari kejahatan makhluk-Nya, dan dari kejahatan malam apabila telah gelap gulita, dan dari kejahatan wanita-wanita tukang sihir yang menghembus pada buhul-buhul, serta dari kejahatan orang yang dengki apabila dia dengki.',
        faedah: 'Barangsiapa membaca tiga surat (Al-Ikhlas, Al-Falaq, An-Naas) setiap pagi dan sore hari, maka cukup baginya dari segala sesuatu. (HR. Abu Dawud, An-Nasa-i, Tirmidzi - Hasan Shahih)',
        count: 3,
        time: 'both'
    },
    {
        id: 4,
        title: 'Surat An-Naas',
        arabic: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَهِ النَّاسِ ۝ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَ النَّاسِ',
        translation: 'Katakanlah: Aku berlindung kepada Tuhan (yang memelihara dan menguasai) manusia, Raja manusia, Sembahan manusia, dari kejahatan (bisikan) syaitan yang biasa bersembunyi, yang membisikkan (kejahatan) ke dalam dada manusia, dari golongan jin dan manusia.',
        faedah: 'Barangsiapa membaca tiga surat (Al-Ikhlas, Al-Falaq, An-Naas) setiap pagi dan sore hari, maka cukup baginya dari segala sesuatu. (HR. Abu Dawud, An-Nasa-i, Tirmidzi - Hasan Shahih)',
        count: 3,
        time: 'both'
    },
    {
        id: 5,
        title: 'Doa Memohon Kebaikan Pagi',
        arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَـهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيْكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيْرُ. رَبِّ أَسْأَلُكَ خَيْرَ مَا فِيْ هَذَا الْيَوْمِ وَخَيْرَ مَا بَعْدَهُ، وَأَعُوْذُ بِكَ مِنْ شَرِّ مَا فِيْ هَذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ، رَبِّ أَعُوْذُ بِكَ مِنَ الْكَسَلِ وَسُوْءِ الْكِبَرِ، رَبِّ أَعُوْذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ',
        translation: 'Kami telah memasuki waktu pagi dan kerajaan hanya milik Allah, dan segala puji bagi Allah. Tidak ada Ilah yang berhak diibadahi kecuali Allah semata, tiada sekutu bagi-Nya. Bagi-Nya kerajaan dan bagi-Nya segala puji, dan Dia Mahakuasa atas segala sesuatu. Wahai Rabb, aku memohon kepada-Mu kebaikan di hari ini dan kebaikan sesudahnya, dan aku berlindung kepada-Mu dari kejahatan hari ini dan kejahatan sesudahnya. Wahai Rabb, aku berlindung kepada-Mu dari sifat malas dan kejelekan di hari tua. Wahai Rabb, aku berlindung kepada-Mu dari siksaan di neraka dan siksaan di kubur.',
        faedah: 'HR. Muslim, Abu Dawud, dan Tirmidzi.',
        count: 1,
        time: 'pagi'
    },
    {
        id: 6,
        title: 'Doa Pasrah Hidup dan Mati',
        arabic: 'اَللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوْتُ وَإِلَيْكَ النُّشُوْرُ',
        translation: 'Ya Allah, dengan rahmat dan pertolongan-Mu kami memasuki waktu pagi, dengan rahmat dan pertolongan-Mu kami memasuki waktu sore. Dengan rahmat dan kehendak-Mu kami hidup dan dengan rahmat dan kehendak-Mu kami mati. Dan kepada-Mu kebangkitan (bagi semua makhluk).',
        faedah: 'HR. Tirmidzi, Abu Dawud, Ibnu Majah (Shahih).',
        count: 1,
        time: 'pagi'
    },
    {
        id: 7,
        title: 'Sayyidul Istighfar',
        arabic: 'اَللَّهُمَّ أَنْتَ رَبِّيْ لَا إِلَـهَ إِلَّا أَنْتَ، خَلَقْتَنِيْ وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوْذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوْءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوْءُ بِذَنْبِيْ فَاغْفِرْ لِيْ فَإِنَّهُ لَا يَغْفِرُ الذُّنُوْبَ إِلَّا أَنْتَ',
        translation: 'Ya Allah! Engkau adalah Rabbku, tidak ada Ilah yang berhak diibadahi kecuali Engkau. Engkau yang menciptakanku dan aku adalah hamba-Mu. Aku berada dalam perjanjian dan janji-Mu semampuku. Aku berlindung kepada-Mu dari kejahatan yang kuperbuat. Aku mengakui nikmat-Mu (yang Engkau berikan) kepadaku dan aku mengakui dosaku, oleh karena itu, ampunilah aku. Sesungguhnya tidak ada yang dapat mengampuni dosa kecuali Engkau.',
        faedah: 'Barangsiapa membacanya dengan yakin di waktu pagi lalu ia meninggal sebelum masuk waktu sore, maka ia termasuk ahli Surga. (HR. Al-Bukhari)',
        count: 1,
        time: 'both'
    },
    {
        id: 8,
        title: 'Persaksian Tauhid',
        arabic: 'اَللَّهُمَّ إِنِّي أَصْبَحْتُ أُشْهِدُكَ وَأُشْهِدُ حَمَلَةَ عَرْشِكَ، وَمَلَائِكَتَكَ وَجَمِيْعَ خَلْقِكَ، أَنَّكَ أَنْتَ اللهُ لَا إِلَهَ إِلَّا أَنْتَ وَحْدَكَ لَا شَرِيْكَ لَكَ، وَأَنَّ مُحَمَّدًا عَبْدُكَ وَرَسُوْلُكَ',
        translation: 'Ya Allah, sesungguhnya pada pagi ini aku bersaksi di hadapan-Mu, dan aku persaksikan para malaikat yang memikul Arasy-Mu, malaikat-malaikat-Mu dan seluruh makhluk-Mu, bahwa Engkau adalah Allah, tidak ada yang berhak diibadahi secara benar melainkan Engkau semata, tiada sekutu bagi-Mu, dan bahwa Muhammad adalah hamba dan utusan-Mu.',
        faedah: 'Barangsiapa yang mengucapkan pada waktu pagi atau sore sebanyak empat kali, niscaya Allah membebaskannya dari siksa neraka. (HR. Abu Dawud, dihasankan oleh Syaikh Bin Baaz)',
        count: 4,
        time: 'pagi'
    },
    {
        id: 9,
        title: 'Pernyataan Syukur',
        arabic: 'اَللَّهُمَّ مَا أَصْبَحَ بِيْ مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لَا شَرِيْكَ لَكَ، فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ',
        translation: 'Ya Allah, setiap kenikmatan yang aku dapatkan pada pagi ini atau yang didapatkan oleh salah seorang hamba-Mu, maka pasti berasal dari-Mu semata, tiada sekutu bagi-Mu. Maka bagi-Mu segala puji dan bagi-Mu segala syukur.',
        faedah: 'Barangsiapa yang membacanya pada waktu pagi, maka ia telah menunaikan (kewajiban) syukur pada hari yang dilaluinya. (HR. Ibnu Baaz dalam Tuhfatul Akhyar)',
        count: 1,
        time: 'pagi'
    },
    {
        id: 10,
        title: 'Mohon Kesehatan dan Perlindungan',
        arabic: 'اَللَّهُمَّ عَافِنِيْ فِيْ بَدَنِيْ، اَللَّهُمَّ عَافِنِيْ فِيْ سَمْعِيْ، اَللَّهُمَّ عَافِنِيْ فِيْ بَصَرِيْ، لَا إِلَـهَ إِلَّا أَنْتَ. اَللَّهُمَّ إِنِّي أَعُوْذُ بِكَ مِنَ الْكُفْرِ وَالْفَقْرِ، وَأَعُوْذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، لَا إِلَـهَ إِلَّا أَنْتَ',
        translation: 'Ya Allah! Selamatkan tubuhku (dari penyakit dan dari apa yang tidak aku inginkan). Ya Allah! Selamatkan pendengaranku (dari penyakit dan maksiat). Ya Allah! Selamatkan penglihatanku, tidak ada Ilah yang berhak diibadahi kecuali Engkau. Ya Allah! Sesungguhnya aku berlindung kepada-Mu dari kekufuran dan kefakiran. Dan aku berlindung kepada-Mu dari siksa kubur, tidak ada Ilah yang berhak diibadahi kecuali Engkau.',
        faedah: 'HR. Abu Dawud, Ahmad, Bukhari (Adabul Mufrad).',
        count: 3,
        time: 'both'
    },
    {
        id: 11,
        title: 'Hasbiyallah',
        arabic: 'حَسْبِيَ اللَّهُ لَا إِلَـهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ',
        translation: 'Cukuplah Allah sebagai penolongku, tidak ada yang berhak diibadahi secara benar melainkan Dia. Kepada-Nya aku bertawakal, dan Dia adalah Pemilik al-Arsy yang agung.',
        faedah: 'Barangsiapa mengucapkannya sebanyak tujuh kali setiap pagi dan petang, pasti akan dicukupkan oleh Allah dengan segala perkara dunia dan akhirat yang diperlukannya. (HR. Abu Dawud)',
        count: 7,
        time: 'both'
    },
    {
        id: 12,
        title: 'Mohon Keselamatan Dunia Akhirat',
        arabic: 'اَللَّهُمَّ إِنِّيْ أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ، اَللَّهُمَّ إِنِّيْ أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِيْنِيْ وَدُنْيَايَ وَأَهْلِيْ وَمَالِيْ، اللَّهُمَّ اسْتُرْ عَوْرَاتِي وَآمِنْ رَوْعَاتِي. اَللَّهُمَّ احْفَظْنِيْ مِنْ بَيْنِ يَدَيَّ، وَمِنْ خَلْفِيْ، وَعَنْ يَمِيْنِيْ وَعَنْ شِمَالِيْ، وَمِنْ فَوْقِيْ، وَأَعُوْذُ بِعَظَمَتِكَ أَنْ أُغْتَالَ مِنْ تَحْتِيْ',
        translation: 'Ya Allah! Sesungguhnya aku memohon kebajikan dan keselamatan di dunia dan akhirat. Ya Allah! Sesungguhnya aku memohon kebajikan dan keselamatan dalam agamaku, duniaku, keluargaku dan hartaku. Ya Allah! Tutupilah auratku (aib dan sesuatu yang tidak layak dilihat orang) dan tentramkanlah aku dari rasa takut. Ya Allah! Peliharalah aku dari depanku, dari belakangku, dari kananku, dari kiriku, dan dari atasku. Aku berlindung dengan kebesaran-Mu agar aku tidak dibenamkan ke dalam bumi.',
        faedah: 'HR. Abu Dawud, Ibnu Majah (Shahih).',
        count: 1,
        time: 'both'
    },
    {
        id: 13,
        title: 'Berlindung dari Nafsu dan Setan',
        arabic: 'اللَّهُمَّ عَالِمَ الْغَيْبِ وَالشَّهَادَةِ فَاطِرَ السَّمَاوَاتِ وَالْأَرْضِ، رَبَّ كُلِّ شَيْءٍ وَمَلِيْكَهُ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ، أَعُوْذُ بِكَ مِنْ شَرِّ نَفْسِيْ، وَمِنْ شَرِّ الشَّيْطَانِ وَشِرْكِهِ، وَأَنْ أَقْتَرِفَ عَلَى نَفْسِيْ سُوْءًا، أَوْ أَجُرَّهُ إِلَى مُسْلِمٍ',
        translation: 'Ya Allah! Yang Maha Mengetahui yang ghaib dan yang nyata, Pencipta langit dan bumi, Rabb segala sesuatu dan Yang Merajainya. Aku bersaksi bahwa tidak ada Ilah yang berhak diibadahi kecuali Engkau. Aku berlindung kepada-Mu dari kejahatan diriku, dan dari kejahatan setan dan ajakannya untuk berbuat syirik, dan (aku berlindung kepada-Mu) dari berbuat kejelekan terhadap diriku atau mendorong seorang muslim kepadanya.',
        faedah: 'HR. Tirmidzi & Abu Dawud (Shahih).',
        count: 1,
        time: 'both'
    },
    {
        id: 14,
        title: 'Bismillahilladzi (Perlindungan)',
        arabic: 'بِسْمِ اللهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيْعُ الْعَلِيْمُ',
        translation: 'Dengan menyebut nama Allah, yang dengan nama-Nya, tidak ada sesuatupun yang membahayakan, baik di bumi maupun di langit. Dan Dia Maha Mendengar lagi Maha Mengetahui.',
        faedah: 'Barangsiapa membacanya sebanyak tiga kali ketika pagi dan sore hari, maka tidak ada sesuatu pun yang membahayakan dirinya. (HR. Tirmidzi & Abu Dawud)',
        count: 3,
        time: 'both'
    },
    {
        id: 15,
        title: 'Ridha Terhadap Islam',
        arabic: 'رَضِيْتُ بِاللهِ رَبًّا، وَبِالْإِسْلَامِ دِيْنًا، وَبِمُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا',
        translation: 'Aku ridho Allah sebagai Rabbku, Islam sebagai agamaku, dan Muhammad shallallahu \'alaihi wa sallam sebagai nabiku.',
        faedah: 'Barangsiapa membacanya sebanyak tiga kali ketika pagi dan sore, maka Allah memberikan keridhaan-Nya kepadanya pada hari Kiamat. (HR. Ahmad, Tirmidzi)',
        count: 3,
        time: 'both'
    },
    {
        id: 16,
        title: 'Ya Hayyu Ya Qayyum',
        arabic: 'يَا حَيُّ يَا قَيُّوْمُ بِرَحْمَتِكَ أَسْتَغِيْثُ، أَصْلِحْ لِيْ شَأْنِيْ كُلَّهُ وَلَا تَكِلْنِيْ إِلَى نَفْسِيْ طَرْفَةَ عَيْنٍ',
        translation: 'Wahai Rabb Yang Maha Hidup, Wahai Rabb Yang Maha Berdiri Sendiri (tidak butuh segala sesuatu), dengan rahmat-Mu aku meminta pertolongan, perbaikilah segala urusanku dan janganlah Engkau serahkan (urusanku) kepada diriku sendiri walaupun hanya sekejap mata.',
        faedah: 'HR. Al-Hakim (Hasan).',
        count: 1,
        time: 'both'
    },
    {
        id: 17,
        title: 'Mohon Kemudahan Pagi',
        arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ رَبِّ الْعَالَمِيْنَ، اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ هَذَا الْيَوْمِ، فَتْحَهُ، وَنَصْرَهُ، وَنُوْرَهُ وَبَرَكَتَهُ، وَهُدَاهُ، وَأَعُوْذُ بِكَ مِنْ شَرِّ مَا فِيْهِ وَشَرِّ مَا بَعْدَهُ',
        translation: 'Kami telah memasuki waktu pagi dan kerajaan hanya milik Allah Rabb semesta alam. Ya Allah, aku memohon kepada-Mu kebaikan hari ini, pembukaannya, pertolongannya, cahayanya, berkahnya, dan petunjuknya. Dan aku berlindung kepada-Mu dari kejahatan yang ada padanya dan kejahatan sesudahnya.',
        faedah: 'HR. Abu Dawud (Hasan).',
        count: 1,
        time: 'pagi'
    },
    {
        id: 18,
        title: 'Persaksian Fitrah Islam',
        arabic: 'أَصْبَحْنَا عَلَى فِطْرَةِ الْإِسْلَامِ وَعَلَى كَلِمَةِ الْإِخْلَاصِ، وَعَلَى دِيْنِ نَبِيِّنَا مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، وَعَلَى مِلَّةِ أَبِيْنَا إِبْرَاهِيْمَ، حَنِيْفًا مُسْلِمًا وَمَا كَانَ مِنَ الْمُشْرِكِيْنَ',
        translation: 'Di waktu pagi kami berada diatas fitrah agama Islam, dan diatas kalimat ikhlas, dan diatas agama Nabi kami Muhammad shallallahu \'alaihi wa sallam, dan diatas agama ayah kami Ibrahim, yang lurus, muslim, dan tidak termasuk orang-orang musyrik.',
        faedah: 'HR. Ahmad (Shahih).',
        count: 1,
        time: 'pagi'
    },
    {
        id: 19,
        title: 'Tasbih',
        arabic: 'سُبْحَانَ اللهِ وَبِحَمْدِهِ',
        translation: 'Maha Suci Allah, aku memuji-Nya.',
        faedah: 'Diampuni kesalahannya walau sebanyak buih di lautan. (HR. Muslim)',
        count: 100,
        time: 'both'
    },
    {
        id: 20,
        title: 'Tahlil',
        arabic: 'لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيْكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيْرٌ',
        translation: 'Tidak ada Ilah yang berhak diibadahi dengan benar melainkan hanya Allah Yang Maha Esa, tiada sekutu bagi-Nya. Bagi-Nya kerajaan dan bagi-Nya segala puji. Dan Dialah Yang Maha Kuasa atas segala sesuatu.',
        faedah: 'Membaca 100x pahalanya seperti memerdekakan 10 budak, ditulis 100 kebaikan, dihapus 100 kejelekan, dan dilindungi dari setan. (HR. Bukhari & Muslim)',
        count: 10,
        time: 'both',
        note: 'Bisa 10x atau 100x'
    },
    {
        id: 21,
        title: 'Tasbih dan Tahmid Lengkap',
        arabic: 'سُبْحَانَ اللهِ وَبِحَمْدِهِ: عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ وَمِدَادَ كَلِمَاتِهِ',
        translation: 'Mahasuci Allah dan aku memuji-Nya sebanyak bilangan makhluk-Nya, Mahasuci Allah sesuai keridhaan-Nya, Mahasuci Allah seberat timbangan arasy-Nya, dan Mahasuci Allah sebanyak tinta (yang menulis) kalimat-Nya.',
        faedah: 'HR. Muslim.',
        count: 3,
        time: 'pagi'
    },
    {
        id: 22,
        title: 'Mohon Ilmu dan Rezeki',
        arabic: 'اَللَّهُمَّ إِنِّيْ أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا',
        translation: 'Ya Allah, sesungguhnya aku meminta kepada-Mu ilmu yang bermanfaat, rizki yang baik, dan amalan yang diterima.',
        faedah: 'HR. Ibnu Majah (Shahih).',
        count: 1,
        time: 'pagi',
        note: 'Setelah shalat Shubuh'
    },
    {
        id: 23,
        title: 'Istighfar',
        arabic: 'أَسْتَغْفِرُ اللهَ وَأَتُوْبُ إِلَيْهِ',
        translation: 'Aku memohon ampunan kepada Allah dan bertobat kepada-Nya.',
        faedah: 'Rasulullah bertaubat 100 kali sehari. (HR. Muslim)',
        count: 100,
        time: 'both',
        note: 'Kapan saja'
    },
    {
        id: 24,
        title: 'Shalawat Nabi',
        arabic: 'اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ',
        translation: 'Ya Allah, limpahkanlah shalawat beriring salam kepada Nabi Muhammad shallallahu alaihi wa sallam.',
        faedah: 'Barangsiapa yang membaca shalawat kepadaku ketika pagi sepuluh kali, maka dia akan mendapatkan syafa\'atku pada hari kiamat. (HR. Ath-Thabraniy)',
        count: 10,
        time: 'pagi'
    }
];

// ========== DZIKIR PETANG (20 ITEM) ==========

const DZIKIR_PETANG_ITEMS: DzikirItem[] = [
    // Items 1-2: Same as pagi (Ayat Kursi, 3 surat)
    DZIKIR_PAGI_ITEMS[0], // Ayat Kursi
    DZIKIR_PAGI_ITEMS[1], // Al-Ikhlas
    DZIKIR_PAGI_ITEMS[2], // Al-Falaq
    DZIKIR_PAGI_ITEMS[3], // An-Naas

    // Item 3: Doa Memohon Kebaikan MALAM (khusus petang)
    {
        id: 5,
        title: 'Doa Memohon Kebaikan Malam',
        arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ للهِ، وَالْحَمْدُ للهِ، لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا، وَأَعُوذُبِكَ مِنْ شَرِّ مَا فِي هَذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا، رَبِّ أَعُوذُبِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُبِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ',
        translation: 'Kami telah memasuki waktu sore dan kerajaan hanya milik Allah, dan segala puji bagi Allah. Tidak ada Ilah yang berhak diibadahi kecuali Allah semata, tiada sekutu bagi-Nya. Bagi-Nya kerajaan dan bagi-Nya segala puji, dan Dia Mahakuasa atas segala sesuatu. Wahai Rabb, aku memohon kepada-Mu kebaikan di malam ini dan kebaikan sesudahnya. Dan aku berlindung kepada-Mu dari kejahatan malam ini dan kejahatan sesudahnya. Wahai Rabb, aku berlindung kepada-Mu dari sifat malas dan kejelekan di hari tua. Wahai Rabb, aku berlindung kepada-Mu dari siksaan di neraka dan siksaan di kubur.',
        faedah: 'HR. Muslim.',
        count: 1,
        time: 'petang'
    },

    // Item 4: Doa Pasrah (versi petang)
    {
        id: 6,
        title: 'Doa Pasrah Hidup dan Mati',
        arabic: 'اَللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيْرُ',
        translation: 'Ya Allah, dengan rahmat dan pertolongan-Mu kami memasuki waktu sore, dan dengan rahmat dan pertolongan-Mu kami memasuki waktu pagi. Dengan rahmat dan kehendak-Mu kami hidup, dan dengan rahmat dan kehendak-Mu kami mati. Dan kepada-Mu tempat kembali.',
        faedah: 'HR. Tirmidzi.',
        count: 1,
        time: 'petang'
    },

    // Item 5: Sayyidul Istighfar (same as pagi)
    DZIKIR_PAGI_ITEMS[6],

    // Item 6: Persaksian Tauhid (versi petang)
    {
        id: 8,
        title: 'Persaksian Tauhid',
        arabic: 'اَللَّهُمَّ إِنِّي أَمْسَيْتُ أُشْهِدُكَ وَأُشْهِدُ حَمَلَةَ عَرْشِكَ، وَمَلَائِكَتَكَ وَجَمِيْعَ خَلْقِكَ، أَنَّكَ أَنْتَ اللهُ لَا إِلَهَ إِلَّا أَنْتَ وَحْدَكَ لَا شَرِيْكَ لَكَ، وَأَنَّ مُحَمَّدًا عَبْدُكَ وَرَسُوْلُكَ',
        translation: 'Ya Allah, sesungguhnya pada sore ini aku bersaksi di hadapan-Mu, dan aku persaksikan para malaikat yang memikul Arasy-Mu, malaikat-malaikat-Mu dan seluruh makhluk-Mu, bahwa Engkau adalah Allah, tidak ada yang berhak diibadahi secara benar melainkan Engkau semata, tiada sekutu bagi-Mu, dan bahwa Muhammad adalah hamba dan utusan-Mu.',
        faedah: 'Barangsiapa yang mengucapkan pada waktu pagi atau sore sebanyak empat kali, niscaya Allah membebaskannya dari siksa neraka. (HR. Abu Dawud)',
        count: 4,
        time: 'petang',
        note: 'Khusus sore'
    },

    // Item 7: Pernyataan Syukur (versi petang)
    {
        id: 9,
        title: 'Pernyataan Syukur',
        arabic: 'اَللَّهُمَّ مَا أَمْسَى بِيْ مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لَا شَرِيْكَ لَكَ، فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ',
        translation: 'Ya Allah, setiap kenikmatan yang aku dapatkan pada sore ini atau yang didapatkan oleh salah seorang hamba-Mu, maka pasti berasal dari-Mu semata, tiada sekutu bagi-Mu. Maka bagi-Mu segala puji dan bagi-Mu segala syukur.',
        faedah: 'Barangsiapa membacanya ketika sore, maka ia telah menunaikan (kewajiban) syukur pada malam yang dilaluinya. (HR. Ibnu Baaz)',
        count: 1,
        time: 'petang',
        note: 'Khusus sore'
    },

    // Items 8-14: Same as pagi (items 10-16)
    DZIKIR_PAGI_ITEMS[9],  // Mohon Kesehatan
    DZIKIR_PAGI_ITEMS[10], // Hasbiyallah
    DZIKIR_PAGI_ITEMS[11], // Mohon Keselamatan
    DZIKIR_PAGI_ITEMS[12], // Berlindung dari Nafsu
    DZIKIR_PAGI_ITEMS[13], // Bismillahilladzi
    DZIKIR_PAGI_ITEMS[14], // Ridha Terhadap Islam
    DZIKIR_PAGI_ITEMS[15], // Ya Hayyu Ya Qayyum

    // Item 15: Mohon Kemudahan MALAM (khusus petang)
    {
        id: 17,
        title: 'Mohon Kemudahan Malam',
        arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ للهِ رَبِّ الْعَالَمِيْنَ، اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ هَذِهِ اللَّيْلَةِ، فَتْحَهَا، وَنَصْرَهَا، وَنُورَهَا وَبَرَكَتَهَا، وَهُدَاهَا، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِيهَا وَشَرِّ مَا بَعْدَهَا',
        translation: 'Kami telah memasuki waktu sore, dan kerajaan hanyalah milik Allah Rabb semesta alam. Ya Allah, aku memohon kepada-Mu kebaikan malam ini, pembukaannya, pertolongannya, cahayanya, berkahnya, dan petunjuknya. Dan aku berlindung kepada-Mu dari kejahatan yang ada padanya dan kejahatan sesudahnya.',
        faedah: 'Sanad hasan oleh Syu\'aib dan Abdul Qadir Al-Arnauth.',
        count: 1,
        time: 'petang'
    },

    // Item 16: Persaksian Fitrah Islam (versi petang)
    {
        id: 18,
        title: 'Persaksian Fitrah Islam',
        arabic: 'أَمْسَيْنَا عَلَى فِطْرَةِ الْإِسْلَامِ وَعَلَى كَلِمَةِ الْإِخْلَاصِ، وَعَلَى دِيْنِ نَبِيِّنَا مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، وَعَلَى مِلَّةِ أَبِيْنَا إِبْرَاهِيْمَ، حَنِيْفًا مُسْلِمًا وَمَا كَانَ مِنَ الْمُشْرِكِيْنَ',
        translation: 'Di waktu sore kami berada diatas fitrah agama Islam, dan diatas kalimat ikhlas, dan diatas agama Nabi kami Muhammad shallallahu \'alaihi wa sallam, dan diatas agama ayah kami Ibrahim, yang lurus, muslim, dan tidak termasuk orang-orang musyrik.',
        faedah: 'HR. Ahmad (Shahih).',
        count: 1,
        time: 'petang',
        note: 'Khusus sore'
    },

    // Items 17-18: Same as pagi
    DZIKIR_PAGI_ITEMS[18], // Tasbih
    DZIKIR_PAGI_ITEMS[19], // Tahlil

    // Item 19: Berlindung dari Kejahatan Makhluk (khusus petang)
    {
        id: 21,
        title: 'Berlindung dari Kejahatan Makhluk',
        arabic: 'أَعُوْذُ بِكَلِمَاتِ اللهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
        translation: 'Aku berlindung kepada firman-firman Allah yang sempurna dari kejahatan segala ciptaan-Nya.',
        faedah: 'Barangsiapa yang mengucapkannya ketika sore tiga kali maka tidak akan membahayakannya panasnya malam itu. (HR. Ahmad, Shahih Ibnu Majah)',
        count: 3,
        time: 'petang',
        note: 'Khusus sore'
    },

    // Item 20: Shalawat Nabi
    {
        id: 22,
        title: 'Shalawat Nabi',
        arabic: 'اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ',
        translation: 'Ya Allah, limpahkanlah shalawat beriring salam kepada Nabi Muhammad shallallahu alaihi wa sallam.',
        faedah: 'Barangsiapa yang membaca shalawat kepadaku ketika sore sepuluh kali maka dia akan mendapatkan syafa\'atku pada hari kiamat. (HR. Ath-Thabraniy)',
        count: 10,
        time: 'petang'
    }
];

// Export data untuk Pagi
export const DZIKIR_PAGI: DzikirData = {
    type: 'pagi',
    title: 'Dzikir Pagi',
    description: 'Dzikir yang dibaca di waktu pagi',
    time: 'Setelah Shubuh sampai terbit matahari',
    items: DZIKIR_PAGI_ITEMS
};

// Export data untuk Petang
export const DZIKIR_PETANG: DzikirData = {
    type: 'petang',
    title: 'Dzikir Petang',
    description: 'Dzikir yang dibaca di waktu petang',
    time: 'Setelah Ashar sampai Maghrib',
    items: DZIKIR_PETANG_ITEMS
};
